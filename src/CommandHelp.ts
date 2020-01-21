import { Command } from './Command'

export class CommandHelp extends Command {
  constructor() {
    super({
      name: 'help'
    })
  }

  execute(args: string[]) {
    console.log(`Executed ${CommandHelp.name}`)
  }
}
