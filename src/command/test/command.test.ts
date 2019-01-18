import { Command } from '../command';

const command = new Command('test', true).version('1.0.0').alias('test');

test('Instantiation is successful', () => {
  expect(command._name).toBe('test');
});

test('Version returns correct value', () => {
  expect(command._version).toBe('1.0.0');
});

test('Alias is set correctly', () => {
  expect(command._alias).toBeDefined();
});
