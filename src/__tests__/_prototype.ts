import { CommandBase } from '../CommandBase'
import { Strategos } from '../Strategos'

// parse <> into required or
// code the parameter as required?

// yarn [command] [flags]
// yarn add [packages ...] [flags]
// yarn global [add|bin|remove|list|upgrade] [flags]

class CommandPrototype extends CommandBase {

  constructor() {
    super({
      name: 'prototype',
      description: 'A simple prototype'
    })

    this._addOption({
      name: 'successfulOption',
      description: 'Reports that the option was run successfully',
      callback: () => {
        console.log('Successfully ran the option!')

      }
    })

  }

  execute() {
    console.log('Successfully functions!')
  }
}

new Strategos(process.argv.slice(2), [new CommandPrototype])

// yarn add <typescript, tslint, ...> [--dev, --offline]

const yarnAddOptions = {
  files: ['typescript', 'tslint'],
  dev: true
}

// if (this.options.dev) {}
