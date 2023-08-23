import type { IDomEditor, SlateRange } from '@wangeditor/editor'
import { ref } from 'vue'

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

const selection = ref<SlateRange | null>()

export function recoreSelection(editor: IDomEditor): void {
  if (editor.selection) {
    console.log(editor.selection)
    selection.value = editor.selection as SlateRange
  }
}

export function unrecordSelection() {
  selection.value = null
}

export function getSelectionByRecord() {
  if (selection.value) return selection.value
  return null
}
