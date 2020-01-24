import { Command, Strategos } from '../'

export class Echo extends Command {
  constructor() {
    super({
      name: 'echo'
    })

    this.addOption({
      name: 'double',
      alias: 'd',
      type: 'required',
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

/**
 * TODO Test for conjoined aliases like `-abc`
 */
const mockInput = ['echo']

new Strategos(mockInput, { whenArgsNotSpecified: 'emitError' }, [new Echo])
