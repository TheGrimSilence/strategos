import { CommandCollection } from '../Collections'
import { Echo } from './_prototype'
// jest.mock('../Collections.ts')

describe('CommandCollection', () => {
  const commands = new CommandCollection()
  const expectedOutput = {}
  it('creates an empty Map', () => {
    expect(commands.size()).toBe(0)
  })

  it('can add a command', () => {
    commands.add('echo', new Echo)
    expect(commands.has('echo')).toBeTruthy()
  })

  // ! Figure out the mock data before creating more tests
  // it('can get a command', () => {
  //   expect(commands.get('echo')).toHaveReturned()
  // })
})
