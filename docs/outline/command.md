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
