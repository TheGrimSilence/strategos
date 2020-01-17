import { CommandHandler } from './CommandHandler'
import { CommandHelp } from './CommandHelp'
import { Strategos } from './Strategos'

export class StrategosCommandManager extends CommandHandler {
  private readonly strategos: Strategos

  public constructor(strategos: Strategos) {
    super()

    this.strategos = strategos
    this.registerCommand(new CommandHelp())
  }

  protected getStrategos(): Strategos {
    return this.strategos
  }
}
