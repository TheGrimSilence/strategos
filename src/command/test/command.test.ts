import { xcommand } from '../command';

const commandName = 'test <dir> [otherDirs...]';
const commandVersion = '1.2.3';
const commandAlias = 't';

const command = xcommand(commandName)
  .version(commandVersion)
  .verbose()
  .alias(commandAlias);

test('Instantiation is successful', () => {
  expect(command.getName).toBe(commandName);
});

test('Version returns correct value', () => {
  expect(command.getVersion).toBe(commandVersion);
});

test('Alias is set correctly', () => {
  expect(command.getAlias).toBeDefined();
});
