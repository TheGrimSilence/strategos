import { Strategos, AbstractCommand } from '../'

class Echo extends AbstractCommand {
  readonly _name: string
  readonly _alias: string
  readonly _version: string

  constructor() {
    super()

    this._name = 'echo'
    this._alias = 'e'
    this._version = '1.0.0'
  }

  get getName() {
    return this._name
  }

  get getAlias() {
    return this._alias
  }

  getUsage() {
    return 'echo <your_string>'
  }

  execute(args: string[]) {
    console.log(args[0])
  }
}

new Strategos(process.argv.slice(2), [new Echo()])
