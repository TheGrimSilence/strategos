import { Command } from './Command'

export class CommandCollection {
  private _commands: Map<string, Command> = new Map<string, Command>()

  public register(id: string, command: Command) {
    this._commands.set(id, command)
  }

  public forEach(callback: (id: string, command: Command) => void) {
    this._commands.forEach((value, key) => callback(key, value))
  }

  public has(id: string): boolean {
    return this._commands.has(id)
  }

  public get(id: string): Command | undefined {
    if (this._commands.size === 0) {
      console.log('cannot get from empty map')
    }
    return this._commands.get(id)
  }
}
