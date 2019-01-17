import camelCase from './utils/camelCase';

export default class Option {
  public flags: string | string[];
  public description: string;
  public required: boolean;
  public optional: boolean;
  public bool: boolean;
  public short: string;
  public long: string;

  public constructor(flags: string | string[], description: string) {
    this.flags = flags;
    this.description = description || '';
    this.required = flags.indexOf('<') >= 0;
    this.optional = flags.indexOf('[') >= 0;
    this.bool = flags.indexOf('-no-') === -1;

    flags = (flags as string).split(/[ ,|]+/);
    if (flags.length > 1 && !/^[[<]/.test(flags[1])) {
      this.short = flags.shift();
    }
    this.long = flags.shift();
  }
  /**
   * Returns the option's name.
   *
   * @returns {string}
   * @memberof IOption
   */
  public name(): string {
    return this.long.replace('--', '').replace('no-', '');
  }
  /**
   * Return the option's name in camelCase format to be used as an attribute.
   *
   * @returns {string}
   * @memberof IOption
   */
  public attributeName(): string {
    return camelCase(this.name());
  }
  /**
   * Checks `arg` against the flags.
   *
   * @param {string} arg the argument to check.
   * @returns {boolean}
   * @memberof IOption
   */
  public is(arg: string): boolean {
    return this.short === arg || this.long === arg;
  }
}
