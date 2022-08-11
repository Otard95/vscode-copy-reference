import * as vscode from 'vscode'
import isNumber from './isNumber'
import isObject from './isObject'
import isString from './isString'

interface ReferenceContext {
  editor: vscode.TextEditor
  selection: vscode.Selection
  root: string
  filePath: string
  projectName: string
  line: number
}

let lastFailed = 0

const getReferenceContext = (): ReferenceContext | undefined => {
  
  const editor = vscode.window.activeTextEditor
  const root = (vscode.workspace.workspaceFolders || [])[0]?.uri.fsPath
  const filePath = editor?.document.fileName || 'Unknown-File'
  const selection = editor?.selection
  const line = selection?.start.line
  const projectName = vscode.workspace.name

  if (
    !isObject(editor)
    || !isObject(selection)
    || !isString(root)
    || !isString(filePath)
    || !isString(projectName)
    || !isNumber(line)
  ) {
    if (Date.now() - lastFailed > 20000)
      vscode.window.showWarningMessage(
        'Oops, seems that could not be copied',
        'Try saving the file first.'
      ).then(res => !!res && editor?.document.save())
    else
      vscode.window.showWarningMessage(
        'Hmm seems there\'s a bigger issue. If the problem persist take note of the circumstances and report it.',
        'Create an Issue'
      ).then(
        res => !!res && vscode.commands.executeCommand(
          'vscode.open',
          vscode.Uri.parse('https://github.com/Otard95/vscode-copy-reference/issues')
        )
      )
    lastFailed = Date.now()
    return
  }

  return {
    editor,
    selection,
    root,
    filePath,
    projectName,
    line
  }

}

export default getReferenceContext