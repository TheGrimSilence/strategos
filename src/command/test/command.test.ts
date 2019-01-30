import { command } from '../Command';
import { ICommand } from '../CommandInternals';

describe('Error checks', () => {
  test('Throws on non-string name', () => {
    const cmd = () => {
      // @ts-ignore
      command(1).end();
    };
    expect(cmd).toThrowError(
      new Error('Command must be handed a command object or string name'),
    );
  });

  test('Throws on non-semver version', () => {
    const cmd = () => {
      command('test')
        .version('1')
        .end(true);
    };
    expect(cmd).toThrowError(new Error('Version is not valid semver!'));
  });
});

describe('Instantiation checks', () => {
  test('Accepts a command string', () => {
    const cmd = command('test').end(true);
    expect(cmd).toMatchObject({ name: 'test' } as ICommand);
  });

  test('Accepts an alias', () => {
    const cmd = command('test')
      .alias('a')
      .end(true);
    expect(cmd).toMatchObject({ name: 'test', alias: 'a' } as ICommand);
  });

  test('Accepts a description', () => {
    const cmd = command('test')
      .description('A new hope')
      .end(true);
    expect(cmd).toMatchObject({
      name: 'test',
      description: 'A new hope',
    } as ICommand);
  });

  test('Accepts a semver version', () => {
    const cmd = command('test')
      .version('1.2.3')
      .end(true);
    expect(cmd).toMatchObject({ name: 'test', version: '1.2.3' } as ICommand);
  });

  test('Accepts and builds an option', () => {
    const cmd = command('test')
      .option('i, index')
      .end(true);
    expect(cmd).toMatchObject({
      name: 'test',
      options: [{ name: 'index', flags: { long: 'index', short: 'i' } }],
    } as ICommand);
  });
});
