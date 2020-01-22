import { Command } from './Command'

interface ICollection {
  /**
   * Add the given item to the collection.
   * @param id the unique ID of the item.
   * @param collectionName the item being added.
   */
  add(id: string, collectionName: unknown): void

  /**
   * Iterate over the items in the collection.
   * @param callback the function to be run on each item.
   */
  forEach(callback: (id: string, collectionName: unknown) => void): void

  /**
   * Check to see if a given item exists.
   * @param id the item being checked against.
   */
  has(id: string): boolean

  /**
   * Get a given item from the collection.
   * @param id the item being gotten.
   */
  get(id: string): unknown

  /**
   * The size of the collection.
   */
  size(): number
}

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
  get(arg: string): string

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

export interface IOption {
  name: string
  type?: 'required' | 'variadic' | 'boolean'
  alias?: string | string[]
  description?: string
  action?: (...unknown: unknown[]) => void
}

export class CommandCollection implements ICollection {
  private _commands: Map<string, Command> = new Map<string, Command>()

  public add(id: string, command: Command): void {
    this._commands.set(id, command)
  }

  public forEach(callback: (id: string, command: Command) => void): void {
    this._commands.forEach((value, key) => callback(key, value))
  }

  public has(id: string): boolean {
    return this._commands.has(id)
  }

  public get(id: string): Command | undefined {
    return this._commands.get!(id)
  }

  public size(): number {
    return this._commands.size
  }
}

/**
 * Ideally, this should keep track of what options belong to what command, including global options.
 */
export class OptionCollection implements ICollection {
  private _options: Map<string, IOption> = new Map<string, IOption>()

  public add(id: string, option: IOption): void {
    this._options.set(id, option)
  }

  public forEach(callback: (id: string, option: IOption) => void): void {
    this._options.forEach((value, key) => callback(key, value))
  }

  public has(id: string): boolean {
    return this._options.has(id)
  }

  public get(id: string): IOption | undefined {
    return this._options.get(id)
  }

  public size(): number {
    return this._options.size
  }
}

export class ArgumentSet implements ISet {
  private _arguments: Set<string> = new Set<string>()

  public add(arg: string): void {
    this._arguments.add(arg)
  }

  public forEach(callback: (arg: string) => void): void {
    this._arguments.forEach(value => callback(value))
  }

  public has(arg: string): boolean {
    return this._arguments.has(arg)
  }

  public get(arg: string): string {
    let gotValue: string = ''

    this._arguments.forEach(value => {
      if (value === arg) {
        gotValue = value
      }
    })

    return gotValue
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
