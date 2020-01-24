interface ISet {
  /**
   * Add the argument to the set.
   * @param arg the unique argument.
   */
  add(arg: string): void

  /**
   * Iterate over the arguments in the set.
   * @param callback the function to be run on each argument.
   */
  forEach(callback: (arg: string) => void): void

  /**
   * Check to see if a given argument exists.
   * @param arg the argument being checked against.
   */
  has(arg: string): boolean

  /**
   * Get a given argument from the set.
   * @param arg the argument being gotten.
   */
  get(arg: number): string

  /**
   * The size of the set.
   */
  size(): number
  // * Advanced operation * //

  /**
   * Delete the argument from the set.
   * @param arg the argument being deleted.
   */
  delete(arg: string): void

  /**
   * Clear all arguments in the set.
   */
  clear(): void
}

/**
 * The ArgumentSet is the global store of arguments passed into Strategos.
 * Rather that a simple array, Strategos uses a `Set`, this offers a few 
 * benefits performance-wise, and locks down on adding repetitive items.
 */
class ArgumentSet implements ISet {
  private _arguments: Set<string> = new Set<string>()

  public add(arg: string): void {
    this._arguments.add(arg)
  }

  public forEach(callback: (arg: string) => void): void {
    this._arguments.forEach(value => callback(value))
  }

  public has(arg: string): boolean {
    console.log('has', arg)

    if (this._arguments.has(`--${arg}`)) {
      return this._arguments.has(`--${arg}`)
    }

    return this._arguments.has(arg)
  }

  public get(arg: number): string {
    let value = [...this._arguments]

    return value[arg]
  }

  public size(): number {
    return this._arguments.size
  }

  // * Advanced Operations * //

  public delete(arg: string): void {
    this._arguments.delete(arg)
  }

  public clear(): void {
    this._arguments.clear()
  }
}

/**
 * The `argumentHandler` exists to instantiate a global `ArgumentSet` instance.
 */
export const argumentHandler = new ArgumentSet()
