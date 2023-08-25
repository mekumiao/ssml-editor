import type { IDomEditor, SlateRange } from '@wangeditor/editor'
import { toRaw } from 'vue'

const EDITOR_KEY = '--editor-vdata'

export function saveChildren(children: any): void {
  const data = JSON.stringify(children)
  window.localStorage.setItem(EDITOR_KEY, data)
}

export function readChildren() {
  const data = window.localStorage.getItem(EDITOR_KEY)
  if (data) {
    const vdata = JSON.parse(data)
    if (vdata instanceof Array) {
      return vdata
    }
  }
  return undefined
}

let selection: SlateRange | null

export function recordSelection(editor: IDomEditor): void {
  if (editor.selection) {
    selection = editor.selection as SlateRange
  }
}

export function unrecordSelection() {
  selection = null
}

export function getSelectionByRecord() {
  if (selection) return toRaw(selection)
  return null
}
