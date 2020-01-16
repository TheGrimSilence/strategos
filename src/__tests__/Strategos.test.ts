import { Strategos } from '../'
import { exec, ChildProcess } from 'child_process'
import { resolve } from 'path'

test('Instantiates without errors', () => {
  expect(new Strategos(['help'], []))
})

test('"help" is enabled', async () => {
  let result: any = await cli(['h'], '.')
  expect(result.code).toBe(0)
})

function cli(args: string[], cwd: string) {
  return new Promise(resolve => {
    exec(`ts-node ${resolve('./StrategosTestScript.ts')} ${args}`, { cwd }, (error, stdout, stderr) => {
      resolve({ code: error && error.code ? error.code : 0, error, stdout, stderr })
    })
  })
}
