
const normalizePath = (path: string): string => {
  return path.replace(/^[/\\]/, '').replace(/[/\\]$/, '')
}

export default normalizePath