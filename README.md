# Strategos

A TypeScript focused solution for command-line applications.

Strategos is a new way to build command-line applications. Build with some class, and skip the method chaining.

## Install

```bash
yarn add strategos
```

## Usage

Creating a command is extremely simple. Here's a simple echo command:

```typescript
export class CommandEcho extends CommandBase implements ICommand {
  public getName(): string {
    return "echo";
  }

  public getAliases(): string[] {
    return ["e"];
  }

  public getUsage(): string {
    return "echo <your_string>";
  }

  public execute(args: string[]): void {
    console.log(args[0]);
  }
}
```

You can then get started by creating a Strategos instance and passing in any string array for testing, and `process.argv.slice(2)` for getting real command line input.
Then pass in an array of your commands. I'm working on instantiatiing commands via a directory and naming scheme as well.

```typescript
import { Strategos } from "strategos";

new Strategos(process.argv.slice(2), [new CommandEcho(), new CommandAdd()]);
```

It's as simple as that.
