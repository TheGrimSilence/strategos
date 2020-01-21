interface IOption {
  name: string
  type?: 'required' | 'variadic' | 'boolean'
  alias?: string | string[]
  description?: string
  action?: () => void
}

/**
 * Ideally, this should keep track of what options belong to what command, including global options.
 */
export class OptionCollection {
  _options: Set<IOption> = new Set<IOption>()

}
