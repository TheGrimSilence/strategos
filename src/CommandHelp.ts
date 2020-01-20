import { CommandBase } from './CommandBase'

export class CommandHelp extends CommandBase {
  constructor() {
    super({
      name: 'help',
      alias: 'h',
      description: 'Returns helpful information about a given command, or the program.',
      version: '1.0.0'
    })
  }

  public getUsage(): string {
    return 'help [command]'
  }

  public execute(args: string[]) {
    console.log(`Successfully reached execution stage`)

    console.log(args)
  }
}
