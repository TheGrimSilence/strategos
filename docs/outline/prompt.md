# `Prompt(questions: IPrompt | IPrompt[], options: IPromptOptions)`

## `interface IPrompt`

### `type: text | password | hidden | number | confirm | list | toggle | select | multiselect | autocomplete`

The prompt type

### `name: string`

### `message: string`

### `initial: string`

## `interface IPromptOptions`

### `onSubmit(): void`

### `onCancel(): void`