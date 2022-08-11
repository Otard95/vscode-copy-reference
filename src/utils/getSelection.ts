import * as vscode from 'vscode'

const getSelection = (selection: vscode.Selection, editor: vscode.TextEditor): string => {
  if (editor.document.isDirty) editor.document.save()

  const lines = []
  for (let i = selection.start.line; i <= selection.end.line; i++) {
    lines.push(editor.document.lineAt(i))
  }
  const indent = lines.reduce((max, line) => {
    return Math.min(line.firstNonWhitespaceCharacterIndex, max)
  }, Infinity)

  const selectedText = lines
    .map(line => line.text.substring(Math.max(indent, 0)))
    .join('\n')

  return selectedText
}

export default getSelection
