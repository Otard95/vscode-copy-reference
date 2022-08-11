// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { extname } from 'path'
import getSelection from './utils/getSelection'
import getReferenceContext from './utils/getReferenceContext'
import normalizePath from './utils/normalizePath'
import getTemplate from './utils/getTemplate'
import showConfirmation from './utils/showConfirmation'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "copy-reference" is now active!');

  const copyAtCursor = vscode.commands.registerCommand('copy-reference.copyAtCursor', () => {

    const context = getReferenceContext()

    if (!context) {
      return
    }

    const relativePath = normalizePath(context.filePath.replace(context.root, ''))

    const template = getTemplate()

    if (!context.selection.isEmpty) {
      const selectedText = getSelection(context.selection, context.editor)
      const ext = extname(context.filePath).substring(1)
      vscode.env.clipboard.writeText(template.block(context.projectName, relativePath, context.line + 1, ext, selectedText))
    } else {
      vscode.env.clipboard.writeText(template.simple(context.projectName, relativePath, context.line))
    }

    showConfirmation()

  })

  context.subscriptions.push(copyAtCursor)
}

// this method is called when your extension is deactivated
export function deactivate() {}
