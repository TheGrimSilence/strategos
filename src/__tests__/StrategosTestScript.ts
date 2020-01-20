import { Strategos, CommandBase } from '../'

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

new Strategos(process.argv.slice(2), [new CommandEcho()])
