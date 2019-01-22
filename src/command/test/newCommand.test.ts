import { Command as XCommand } from '../NewCommand';

function Command(name?: any) {
  return name ? new XCommand(name) : new XCommand();
}

test('Returns writes to local object successfully', () => {
  expect(Command().name('test').getName).toBe('test');
});
