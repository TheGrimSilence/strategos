# `Command(name: string)`

### `alias(alias: string)`

> Add an alias for the command.

### `option(flags: string, description: string, callback()?: void)`

> Add an option to the command.

### `description(desc: string)`

> Add a description to the command.

### `options(options: ICommandOptions)`

> Add an object to be used as the options.

### `version()`

> Return the version of the command.

### `help()`

> Return helpful information.

### `usage()`

> Return usage information.

### `action(fn(): void)`

> Add an action to be run.

### `on(event: string, callback(): void)`

> Add an event listener
