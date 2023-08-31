import { DomEditor, type IDomEditor, SlateNode } from '@wangeditor/editor'

export default <T extends IDomEditor>(editor: T) => {
  const { isInline, isVoid } = editor
  const newEditor = editor

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'ssml-audio') return true
    return isInline(elem)
  }

  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'ssml-audio') {
      return !SlateNode.string(elem)
    }
    return isVoid(elem)
  }

  return newEditor
}
