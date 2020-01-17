import { CommandBase } from './CommandBase'

export class CommandHelp extends CommandBase {
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

  public execute(args: string[]) {
    console.log(`Successfully reached execution stage`)

    console.log(args)
  }
}
