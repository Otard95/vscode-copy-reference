export const block = (
  relativePath: string,
  line: number,
  ext: string,
  selectedText: string
) => `\`${relativePath}:${line}\`\n\`\`\`${ext}\n${selectedText}\n\`\`\``

export const simple = (
  relativePath: string,
  line: number
) => `\`${relativePath}:${line + 1}\``