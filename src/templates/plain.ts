export const block = (
  relativePath: string,
  line: number,
  _ext: string,
  selectedText: string
) => `${relativePath}:${line}\n${selectedText}`

export const simple = (
  relativePath: string,
  line: number,
) => `${relativePath}:${line}`