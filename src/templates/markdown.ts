import { TemplateBlockFn, TemplateSimpleFn } from '../utils/getTemplate'

export const block: TemplateBlockFn = (
  projectName: string,
  relativePath: string,
  line: number,
  ext: string,
  selectedText: string
) => `\`${projectName}/${relativePath}:${line}\`\n\`\`\`${ext}\n${selectedText}\n\`\`\``

export const simple: TemplateSimpleFn = (
  projectName: string,
  relativePath: string,
  line: number
) => `\`${projectName}/${relativePath}:${line + 1}\``