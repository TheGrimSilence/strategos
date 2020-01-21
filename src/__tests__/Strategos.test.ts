import { Strategos } from '../Strategos'
import { Echo } from './_prototype'

describe('general instantiation', () => {

  it('Instantiates without error', () => {
    expect(new Strategos().main(['help'], {}))
  })

  it('Registers Echo without error', () => {
    new Strategos().main(['help'], {}, [new Echo])
  })
})

describe('advanced issues', () => {

  it('errors without arguments when specified', () => {
    new Strategos().main([], { whenArgsNotSpecified: 'emitError' })
  })
})
