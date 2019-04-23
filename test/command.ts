import { Command } from '../src/xHouston';

const yarn = new Command('add');

yarn
  .option(
    'offline',
    'trigger an error if any required dependencies are not available in local cache'
  )
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
  .end(process.argv);
