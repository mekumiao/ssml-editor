import type { Descendant } from 'slate'

const EDITOR_KEY = '--editor-vdata'

export function saveChildren(children: Descendant[]): void {
  const data = JSON.stringify(children)
  window.localStorage.setItem(EDITOR_KEY, data)
}

export function readChildren() {
  const data = window.localStorage.getItem(EDITOR_KEY)
  if (data) {
    const vdata = JSON.parse(data)
    if (vdata instanceof Array) {
      return vdata as Descendant[]
    }
  }
  return null
}
