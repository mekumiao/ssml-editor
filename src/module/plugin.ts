import { DomEditor, type IDomEditor } from '@wangeditor/editor'

function withSSML<T extends IDomEditor>(editor: T) {
  const { isInline, isVoid, deleteBackward, deleteForward, insertBreak } = editor
  const newEditor = editor

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem)

    if (type === 'polyphone') return true
    if (type === 'continuous') return true
    if (type === 'say-as') return true
    if (type === 'break') return true
    if (type === 'prosody') return true

    return isInline(elem)
  }

  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem)

    if (type === 'polyphone') return true
    if (type === 'continuous') return false
    if (type === 'say-as') return false
    if (type === 'break') return true
    if (type === 'prosody') return false

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
