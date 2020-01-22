import { Command, Strategos } from '../'

export class Echo extends Command {
  constructor() {
    super({
      name: 'echo'
    })

    this.addOption({
      name: 'double',
      type: 'optional',
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

const mockInput = ['echo', '--double']

new Strategos(mockInput, { whenArgsNotSpecified: 'emitError' }, [new Echo])
