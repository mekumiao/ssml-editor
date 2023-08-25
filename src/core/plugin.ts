import { type IDomEditor } from '@wangeditor/editor'

export default <T extends IDomEditor>(editor: T) => {
  const { deleteBackward, deleteForward, insertBreak, apply, normalizeNode, insertText } = editor
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
    // console.log('normalizeNode', JSON.stringify(entry))
    normalizeNode(entry)
  }

  newEditor.apply = (operation) => {
    // console.log('apply', JSON.stringify(operation))
    apply(operation)
  }

  newEditor.insertText = (text) => {
    insertText(text)
  }
  return newEditor
}
