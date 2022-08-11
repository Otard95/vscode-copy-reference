import { Template } from './getTemplate';

const createTemplateFromFormat = (blockFormat: string, simpleFormat: string): Template => ({
  block: (
    projectName: string,
    relativePath: string,
    line: number,
    ext: string,
    selectedText: string
  ) => blockFormat
    .replace(/{project}/g,  projectName)
    .replace(/{path}/g, relativePath)
    .replace(/{line}/g, `${line}`)
    .replace(/{ext}/g, ext)
    .replace(/{selected}/g, selectedText)
    .replace(/{n}/g, '\n'),
  simple: (
    projectName: string,
    relativePath: string,
    line: number,
  ) => simpleFormat
    .replace(/{project}/g,  projectName)
    .replace(/{path}/g, relativePath)
    .replace(/{line}/g, `${line}`)
    .replace(/{n}/g, '\n'),
})

export default createTemplateFromFormat