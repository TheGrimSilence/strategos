import { Strategos } from '../Strategos'

describe('general instantiation', () => {
  it('Instantiates without error', () => {
    expect(new Strategos(['help'], {}))
  })
})
