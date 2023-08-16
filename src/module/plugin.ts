import { DomEditor, type IDomEditor } from '@wangeditor/editor'
import type { W } from './custom-types'

function withSSML<T extends IDomEditor>(editor: T) {
  const { isInline, isVoid, deleteBackward, deleteForward, insertBreak } = editor
  const newEditor = editor

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem)

    if (type === 'ssml-w') return true
    if (type === 'ssml-p') return true
    if (type === 'ssml-break') return true
    if (type === 'ssml-say-as') return true

    return isInline(elem)
  }

  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem)

    if (type === 'ssml-w') {
      const { phoneme } = elem as W
      return !!phoneme
    }
    if (type === 'ssml-p') return true
    if (type === 'ssml-break') return true
    if (type === 'ssml-say-as') return false

    return isVoid(elem)
  }

  newEditor.deleteBackward = (unit) => {
    deleteBackward(unit)
  }

  newEditor.deleteForward = (unit) => {
    deleteForward(unit)
  }

  newEditor.insertBreak = () => {
    insertBreak()
  }

  return newEditor
}

export default withSSML
