import { Strategos, AbstractCommand } from '../'

class CommandEcho extends AbstractCommand {
  readonly _name: string
  readonly _alias: string
  readonly _version: string

  constructor() {
    super()

    this._name = 'echo'
    this._alias = 'e'
    this._version = '1.0.0'
  }

  getUsage() {
    return 'echo <your_string>'
  }

  execute(args: string[]) {
    console.log(args[0])
  }
}

new Strategos(process.argv.slice(2), [new CommandEcho()])
