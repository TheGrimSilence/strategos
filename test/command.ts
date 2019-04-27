import { Command } from '../src/xHouston';

const yarn = new Command('add');
// yarn global add webpack --offline
yarn
  .option({
    alias: 'o',
    description:
      'trigger an error if any required dependencies are not available in local cache',
    name: 'offline',
    type: 'boolean',
  })
  .option({
    alias: 't',
    description: 'A testful command',
    name: 'test',
    type: 'variadic',
  })
  .option({
    alias: 'c',
    description: 'Test parameter pickup',
    name: 'content',
    type: 'required',
  })
  .subCommand(new Command('add'))
  .subCommand(new Command('resolve'))
  .subCommand(new Command('list'))
  .subCommand(new Command('login'))
  .subCommand(new Command('logout'))
  .subCommand(
    new Command('global')
      .subCommand(new Command('add'))
      .subCommand(new Command('remove'))
      .subCommand(new Command('list'))
  )
  .config({ passive: true, verbose: true })
  .end(process.argv.slice(2));
