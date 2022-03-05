// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { extname, basename } from 'path'
import isNumber from './utils/isNumber';
import isObject from './utils/isObject';
import isString from './utils/isString';
import { block as MdBlock, simple as MdSimple } from './templates/markdown';
import { block as PlainBlock, simple as PlainSimple } from './templates/plain';

let lastFailed = 0

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "copy-reference" is now active!');

  const copyAtCursor = vscode.commands.registerCommand('copy-reference.copyAtCursor', () => {

    const editor = vscode.window.activeTextEditor
    const root = (vscode.workspace.workspaceFolders || [])[0]?.uri.fsPath
    const filePath = editor?.document.fileName || 'Unknown-File'
    const selection = editor?.selection
    const line = selection?.start.line
    const projectName = vscode.workspace.name
    const configuration = vscode.workspace.getConfiguration('copy-reference')
    const format = configuration.get('format')

    if (
      !isString(filePath)
      || !isString(root)
      || !isNumber(line)
      || !isObject(selection)
      || !isObject(editor)
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

    let relativePath = basename(filePath)
    if (isString(root) && isString(projectName))
      relativePath = filePath.replace(root, projectName)

    const template = (format || 'Markdown') === 'Markdown'
      ? { block: MdBlock, simple: MdSimple }
      : { block: PlainBlock, simple: PlainSimple }

    if (!selection.isEmpty) {
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
      const ext = extname(filePath).substring(1)
      vscode.env.clipboard.writeText(template.block(relativePath, line, ext, selectedText))
    } else {
      vscode.env.clipboard.writeText(template.simple(relativePath, line))
    }

    vscode.window.showInformationMessage(`Copied to clipboard!`)

  })

  context.subscriptions.push(copyAtCursor);
}

// this method is called when your extension is deactivated
export function deactivate() {}
