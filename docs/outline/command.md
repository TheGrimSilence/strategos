# Command Checklist

- [ ] `action()`: Add an action to be run.
- [x] ~~`alias()`: Add an alias for the command.~~
- [x] ~~`description()`: Add a description to the command.~~
- [ ] `help()`: Return helpful information.
- [x] ~~`on()`: Add an event listener~~
- [ ] `option()`: Add an option to the command.
- [ ] `options()`: Add an object to be used as the options.
- [ ] `usage()`: Return usage information.
- [x] ~~`version()`: Return the version of the command.~~

We want to allow the user to define a command possible sub-commands.

Given that we have the following command:

```bash
$ yarn global add
```

We can assume the layout would be similar to:

```typescript
Command('global').subCommand('add');
```

And we basically want each subcommand to be it's own entity within the chain.
Basically we want this to work:

```typescript
Command('global')
  .option('--prefix')
  .description('A global command')
  .subCommand('add')
  .description('A global add command')
  .subCommand('bin')
  .description('A global bin command')
  .subCommand('list')
  .description('A global list command')
  .subCommand('remove')
  .description('A global remove command')
  .subCommand('upgrade')
  .description('A global upgrade command');
```

Like this:

```typescript
{
  command: 'global',
  description: 'A global command',
  options: [
    {
      long: '--prefix'
    }
  ],
  subCommands: [
    {
      subCommand: 'add',
      description: 'A global add command'
    },
    {
      subCommand: 'bin',
      description: 'A global bin command'
    },
    {
      subCommand: 'list',
      description: 'A global list command'
    },
    {
      subCommand: 'remove',
      description: 'A global remove command'
    },
    {
      subCommand: 'upgrade',
      description: 'A global upgrade command'
    },
  ]
}
```

## Edit

It doesn't work, instead of completing the chain, it makes a new chain completely.

New approach, try out a function based way for subcommands to work.

Also: test out object-based instantiation?

## 1/21/2019, 1:43:37 AM

Alright, so we've done some testing, the basics work, hooray. However, we're limited, in that everything must be under a single instance. This is ugly. The ideal solution is as follows:

```typescript
import { Command } from 'xhouston';

Command('add')
  .version('1.0.0')
  .description('Add a new package');

Command('remove')
  .version('2.3.5')
  .description('Remove a package');
// A sub-command parent can't have a description or version if it is a
// pass-through parent.
Command('global').subCommand(
  'add',
  { description: 'Add a global package', version: '4.57.4' },
  () => {
    new GlobalAdd();
  }
);
```

Currently, every command added works to a degree, but we should go ahead and switch to the Object-based API

## 1/21/2019, 4:02:12 AM

I've setup the basic api for the new command code. But I'm here again because I want to add some ideas to the structure.

Basically, every command builds its own personal object. When running `parse()`, xHouston should then check the entire structure, we meaning the entirety should look like the object below.

> We also want to add a possible global `version()` link because our api allows for each command to have its own version, this is because that's how yarn does it, add this is meant to benefit the Yarn team as well as myself.

```typescript
// As usual, we're assuming a basic Yarn-like program
[
  {
    name: 'xHoustonCommandManfifest', // this is reserved and cannot be set by anyone but xHouston
    version: '1.2.0', // the global version
    description: "Xploration by Adrian's favorite package manager!",
  },
  {
    name: 'add',
    alias: 'a',
    description: 'Add a package locally',
    version: '1.2.0',
  },
  {
    name: 'remove',
    alias: 'r',
    description: 'Remove a local package',
    version: '1.2.5',
  },
  {
    name: 'global',
    alias: 'g',
    passThrough: true, // this tells xHouston that we're not adding the usual description, etc...
    subCommands: [
      {
        name: 'add',
        alias: 'a',
        description: 'Add a package globally',
        version: '1.2.0',
      },
      {
        name: 'remove',
        alias: 'r',
        description: 'Remove a global package',
        version: '1.2.5',
      },
    ],
  },
];
```

## 1/22/2019, 2:02:27 AM

Alright, so far, everything is working as planned in a basic form. Meaning I have yet to implement any hardcore code. Check the blame to see where I am in history.

Currently every instance of `Command()` acts as a command definition because, that's how it's coded. However, one thing that's bugged me is the empty object at the end of the array as you can see below. Turns out, this is because of how xHouston's system works. Unfortunately, calling a manifest creates an empty object.

```bash
Global scope detected!
Global scope detected!
Global scope detected!
Global scope detected!
creating subCommand Array
Global scope detected!
[ { name: 'add',
    alias: 'a',
    description: 'Add a package locally',
    action: [Function] },
  { name: 'remove',
    alias: 'r',
    description: 'Remove a local package',
    action: [Function] },
  { name: 'list',
    alias: 'l',
    description: 'List local packages',
    action: [Function] },
  { name: 'global',
    alias: 'g',
    subCommands:
     [ { name: 'add',
         description: 'add a package globally',
         action: [Function: action] },
       { name: 'remove',
         description: 'remove a local package',
         action: [Function] } ] },
  {} ]
```
