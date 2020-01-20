# Strategos

A TypeScript focused solution for command-line applications.

Strategos is a new way to build command-line applications. Build with some class, and skip the method chaining.

## ⚠ Under Development ⚠

Strategos, although functional, is still a long ways from "general usage" in that it's lacking many useful features. This project is a learning experience for myself and not meant to be widely (or generally) used. Below are some wanted features.

- Options
  - Currently I'm still debating how to handle options in the best way possible.
- Dynamic usage information
- Subcommands

Once these few items are taken care of, Strategos, like every good commander, will be battle tested and then enlisted! 🛡⚔

## Install

```bash
yarn add strategos
```

## Usage

Creating a command is extremely simple. Here's a simple echo command:

```typescript
class CommandEcho extends CommandBase {
  constructor() {
    super({
      name: 'echo',
      alias: 'e',
      description: 'Returns input',
      version: '1.0.0'
    })
  }

  getUsage() {
    return 'echo <your_string>'
  }

  execute(args: string[]) {
    console.log(args[0])
  }
}
```

You can then get started by creating a Strategos instance and passing in any string array for testing, and `process.argv.slice(2)` for getting real command line input.
Then pass in an array of your commands. I'm working on instantiatiing commands via a directory and naming scheme as well.

```typescript
import { Strategos } from "strategos";

new Strategos(process.argv.slice(2), [new CommandEcho()]);
```

It's as simple as that.
