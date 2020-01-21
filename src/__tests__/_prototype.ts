import { Strategos } from '../Strategos'
import { Command } from '../Command'

class Echo extends Command {
  constructor() {
    super({
      name: 'echo'
    })
  }

  execute(args: string[]): void {
    console.log(`Executed ${Echo.name}`)

  }
}

new Strategos().main(process.argv.slice(2), {}, [new Echo])
