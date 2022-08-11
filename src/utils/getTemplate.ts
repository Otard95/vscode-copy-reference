import * as vscode from 'vscode'
import { block as MdBlock, simple as MdSimple, simple } from '../templates/markdown'
import { block as PlainBlock, simple as PlainSimple } from '../templates/plain'
import createTemplateFromFormat from './createTemplateFromFormat'

export type TemplateBlockFn = (
  projectName: string,
  relativePath: string,
  line: number,
  ext: string,
  selectedText: string
) => string

export type TemplateSimpleFn = (
  projectName: string,
  relativePath: string,
  line: number,
) => string

export interface Template {
  block: TemplateBlockFn
  simple: TemplateSimpleFn
}

const templateMap = new Map<string, () => Template>([
  ['Markdown', () => ({ block: MdBlock, simple: MdSimple })],
  ['Plain Text', () => ({ block: PlainBlock, simple: PlainSimple })],
  ['Custom', () => {
    const configuration = vscode.workspace.getConfiguration('copy-reference')
    const blockFormat = configuration.get<string>('customBlock')
    const simpleFormat = configuration.get<string>('customSimple')
    return createTemplateFromFormat(blockFormat || '', simpleFormat || '')
  }],
])

const getTemplate = (): Template => {

  const configuration = vscode.workspace.getConfiguration('copy-reference')
  const format = configuration.get<string>('format') || 'Markdown'
  const template = templateMap.get(format)

  if (template) return template()
  return { block: MdBlock, simple: MdSimple }

}

export default getTemplate