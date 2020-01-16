import { Strategos, CommandBase, ICommand } from '../'


class Echo extends CommandBase implements ICommand {
  getName() {
    return 'echo'
  }

  getAliases() {
    return ['e']
  }

  getUsage() {
    return 'echo <your_string>'
  }

  execute(args: string[]) {
    console.log(args[0])
  }
}

new Strategos(process.argv.slice(2), [new Echo()])
