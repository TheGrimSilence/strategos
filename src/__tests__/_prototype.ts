import { Command } from '../Command'
import { Strategos } from '../Strategos'

export class Echo extends Command {
  constructor() {
    super({
      name: 'echo'
    })

    this.addOption({
      name: 'double',
      description: 'repeats the stdin twice',
      action: input => {
        console.log(input)
        console.log(input)
      }
    })
  }

  execute(): void {
    console.log(`Executed ${Echo.name}`)
  }
}

new Strategos(process.argv.slice(2), {}, [new Echo])
