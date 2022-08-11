# Reference

Reference adds just one command, **Copy Reference**, which you can access through the command pallet or the right click context menu in editor.

## Features

Choose between two types of reference formats or create your own!

To copy your reference place your caret on the desired line or select a block of code.
Then using the right click context menu or command pallet select the **Copy Reference**
command. The reference will be copied to your clipboard! It's that simple!

![feature X](imgs/CopyReferenceDemo.gif)

---

Based on if you had a selection or not you'll get

```
`<project name>/path/to/file:<line in file as caret position>`
```

Or the more extensive variant when you have a selection, which will include the selected code as a
codeblock.

## Custom Formats

You can create your own custom format from the extension settings.
If the format you can use the following template patterns as place holders
for things like the files path, project name, etc.

| Pattern      | Placeholder for                                          | Example            |
| ------------ | -------------------------------------------------------- | ------------------ |
| `{project}`  | The project name                                         | `my-projext`       |
| `{path}`     | The relative path within the project (no leading `/`)    | `path/to/file.txt` |
| `{line}`     | The line number                                          | `123`              |
| `{ext}`      | The files extension (block only)                         | `txt`              |
| `{selected}` | The selected text (block only, and minimized indents)    | `Some text`        |
| `{n}`        | New line. As VSCode options don't allow multiline inputs | `\n`               |

## Known Issues

 - None so far.

## Release Notes

### 1.2.0

Added custom formats and option to disable copy confirmation.

### 1.1.0

Added plain text reference format

### 1.0.0

Initial release of **Reference**