import { xcommand } from '../command';

const commandName = 'test <dir> [otherDirs...]';
const commandVersion = '1.2.3';
const commandAlias = 't';

const command = xcommand(commandName, true)
  .version(commandVersion)
  .alias(commandAlias);

test('Instantiation is successful', () => {
  expect(command._name).toBe(commandName);
});

test('Version returns correct value', () => {
  expect(command._version).toBe(commandVersion);
});

test('Alias is set correctly', () => {
  expect(command._alias).toBeDefined();
});
