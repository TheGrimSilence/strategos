export enum VerboseLevel {
  /**
   * Logs general information.
   *
   * For example: `<example>`
   */
  General,
  /**
   * Only logs instantiation calls.
   *
   * For example: `Building <command>`
   */
  Instantiation,
}

export enum VerboseStyle {
  /**
   * Aesthetic logging.
   *
   * For example: `{blue •}, {green 🗸}, {red ✗}`
   *
   * Currently undesigned.
   */
  Xploration,
  /**
   * Yarn-based style
   *
   * For example: `{blue info}, {green success}, {red error}`
   *
   */
  Yarn,
  /**
   * Raspberry Pi boot style.
   *
   * For example: `[ {green ok} ], [{red warn}], [{cyan info}]`
   */
  RaspPi,
  /**
   * npm style.
   *
   * For example: `npm {red ERR!} {magenta ${something}}, npm {black.bgYellow WARN}`
   */
  npm,
}

export interface IVerbose {
  verboseStyle: VerboseStyle;
  verboseLevel: VerboseLevel;
}
