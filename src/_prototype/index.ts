import { Command, Strategos } from '..'
import { Echo } from './CommandEcho'

export class Touch extends Command {
  constructor() {
    super({
      name: 'touch'
    })
  }

  execute(): void {
    console.log(`Executed touch`)
  }
}

/**
 * TODO Test for conjoined aliases like `-abc`
 */
const mockInput = ['echo', '--double', 'hello', '-abcd', '-dv', 'world', 'you', 'cruel', 'bastard']

// ? echoer echo 'Hello, World!' --double --verbose
// [echo, 'Hello, World!', --double, --verbose, --offline]
// Strategos (offline: true)
// Echo ['Hello, World!'] (double: true) {verbose()}
new Strategos(mockInput, { whenArgsNotSpecified: 'emitError' }, [new Echo])
