import { Command } from '../../command';

const command = new Command('test').version('1.0.0');

test('Instantiation is successful', () => {
  expect(command._name).toBe('test');
});

test('Version returns correct value', () => {
  expect(command._version).toBe('1.0.0');
});
