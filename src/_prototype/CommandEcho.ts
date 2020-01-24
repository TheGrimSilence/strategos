import { Command } from '..'

export class Echo extends Command {
  constructor() {
    super({
      name: 'echo'
    })

    this.addOption({
      name: 'double',
      alias: 'd',
      required: true,
      type: 'variadic',
      description: 'repeats the stdin twice',
      action: (input: string) => {
        console.log(input)
        console.log(input)
      }
    })

    this.addOption({
      name: 'verbose',
      alias: 'v',
      required: false,
      type: 'boolean',
      description: 'A simple verbose option!'
    })
  }

  execute(): void {
    console.log(`Executed ${Echo.name}`)
  }
}
