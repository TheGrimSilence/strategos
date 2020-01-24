import { Command, Strategos } from '..'
import { IOption } from '../Collections'
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
const mockInput = ['echo', '--double', 'hello', '-abc']

const globalOptions: IOption[] = [
  {
    name: 'offline',
    required: true,
    type: 'boolean',
    description: 'Run Strategos in offline mode'
  }
]

// ? xTouch echo 'Hello, World!' --double --verbose
// ? xTouch file1 file2 file3 --offline
new Strategos(mockInput, { whenArgsNotSpecified: 'emitError', globalOptions }, [new Echo])
