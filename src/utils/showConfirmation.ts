import * as vscode from 'vscode'

// const showConfirmation = () => {
//   const configuration = vscode.workspace.getConfiguration('copy-reference')
//   if (configuration.get<boolean>('disableCopyConfirmation') !== true)
//     vscode.window.setStatusBarMessage(`Copied to clipboard!`)
// }
const showConfirmation = () => {
  const configuration = vscode.workspace.getConfiguration('copy-reference')
  if (configuration.get<boolean>('disableCopyConfirmation') !== true)
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: `Copied to clipboard!`,
        cancellable: false
      },
      (progress) => new Promise((res) => {
        for (let i = 0; i < 100; i++)
          setTimeout(
            () => progress.report({ increment: i }),
            i * 40
          )

        setTimeout(
          () => res(undefined),
          4000
        )
      }) 
    )
}

export default showConfirmation