import { type IDomEditor } from '@wangeditor/editor'

export default <T extends IDomEditor>(editor: T) => {
  const { deleteBackward, deleteForward, insertBreak, apply, normalizeNode } = editor
  const newEditor = editor

  newEditor.deleteBackward = (unit) => {
    deleteBackward(unit)
  }

  newEditor.deleteForward = (unit) => {
    deleteForward(unit)
  }

  newEditor.insertBreak = () => {
    insertBreak()
  }

  newEditor.normalizeNode = (entry) => {
    normalizeNode(entry)
  }

  newEditor.apply = (operation) => {
    apply(operation)
  }

  return newEditor
}
