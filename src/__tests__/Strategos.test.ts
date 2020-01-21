import { Strategos } from '../Strategos'
import { Echo } from './_prototype'

describe('general instantiation', () => {
  it('Instantiates without error', () => {
    new Strategos().main(['help'], {}, [new Echo])
  })
})
