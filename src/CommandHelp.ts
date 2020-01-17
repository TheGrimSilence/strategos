import { AbstractCommand } from './CommandBase'

export class CommandHelp extends AbstractCommand {
  readonly _name: string
  readonly _alias: string
  readonly _version: string

  constructor() {
    super()

    this._name = 'help'
    this._alias = 'h'
    this._version = '1.0.0'
  }

  public getUsage(): string {
    return 'help [command]'
  }

  get getAlias(): string {
    return this._alias
  }

  get getName(): string {
    return this._name
  }

  public execute(args: string[]) {
    console.log(`Successfully reached execution stage`)

    console.log(args)
  }
}
