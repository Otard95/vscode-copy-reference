// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import isNumber from './utils/isNumber';
import isObject from './utils/isObject';
import isString from './utils/isString';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "copy-reference" is now active!');

  const copyAtCursor = vscode.commands.registerCommand('copy-reference.copyAtCursor', () => {

    const editor = vscode.window.activeTextEditor
    const root = (vscode.workspace.workspaceFolders || [])[0]?.uri.fsPath
    const filePath = editor?.document.fileName
    const selection = editor?.selection
    const line = selection?.start.line
    const projectName = vscode.workspace.name

    if (
      !isString(root)
      || !isString(filePath)
      || !isNumber(line)
      || !isString(projectName)
      || !isObject(selection)
      || !isObject(editor)
    ) return

    vscode.window.showWarningMessage(JSON.stringify(selection))

    const relativePath = filePath.replace(root, projectName)

    if (!selection.isEmpty) {
      if (editor.document.isDirty) editor.document.save()
      const lines = []
      for (let i = selection.start.line; i <= selection.end.line; i++) {
        lines.push(editor.document.lineAt(i))
      }
      const indent = lines.reduce((max, line) => {
        return Math.max(line.firstNonWhitespaceCharacterIndex, max)
      }, 0)
      const selectedText = lines
        .map(line => line.text.substring(Math.max(indent-1, 0)))
        .join('\n')
      vscode.env.clipboard.writeText(`\`${relativePath}:${line}\`\n\`\`\`\n${selectedText}\n\`\`\``)
    } else {
      vscode.env.clipboard.writeText(`\`${relativePath}:${line + 1}\``)
    }

    vscode.window.showInformationMessage(`Copied to clipboard!`)

  })

  context.subscriptions.push(copyAtCursor);
}

// this method is called when your extension is deactivated
export function deactivate() {}
