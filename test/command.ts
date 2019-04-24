import { Command } from '../src/xHouston';

const yarn = new Command('add');

yarn
  .option({
    alias: 'o',
    description:
      'trigger an error if any required dependencies are not available in local cache',
    name: 'offline',
    type: 'boolean',
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
  .config({ passive: true })
  .end(process.argv);
