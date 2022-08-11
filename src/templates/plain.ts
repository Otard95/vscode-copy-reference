import { TemplateBlockFn, TemplateSimpleFn } from '../utils/getTemplate'

export const block: TemplateBlockFn = (
  projectName: string,
  relativePath: string,
  line: number,
  _ext: string,
  selectedText: string
) => `${projectName}/${relativePath}:${line}\n${selectedText}`

export const simple: TemplateSimpleFn = (
  projectName: string,
  relativePath: string,
  line: number,
) => `${projectName}/${relativePath}:${line}`