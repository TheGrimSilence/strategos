import { CommandBase } from './CommandBase'
import { ICommandManager } from './ICommandManager'
import { StrategosCommandManager } from './StrategosCommandManager'

export class Strategos {
  public readonly commandManager: ICommandManager

  /**
   * A new kind of command-line interface tool.
   * @param args pass in `process.argv.slice(2)` or any string array for testing.
   * @param commands pass in commands to be added.
   */
  public constructor(args: string[], commands?: CommandBase[]) {
    this.commandManager = this.createCommandManager()

    if (commands!.length > 0) {
      commands!.forEach(command => {
        this.getCommandManager().registerCommand(command)
      })
    }

    this.getCommandManager().executeCommand(args)
  }

  public getCommandManager(): ICommandManager {
    return this.commandManager
  }

  public createCommandManager(): StrategosCommandManager {
    return new StrategosCommandManager(this)
  }
}
