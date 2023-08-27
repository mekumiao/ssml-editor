import { type IDomEditor } from '@wangeditor/editor'

export default <T extends IDomEditor>(editor: T) => {
  const {
    deleteBackward,
    deleteForward,
    insertBreak,
    apply,
    normalizeNode,
    insertText,
    insertData,
    setFragmentData,
  } = editor
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
    console.log('normalizeNode')
    normalizeNode(entry)
  }

  newEditor.apply = (operation) => {
    console.log('apply', JSON.stringify(operation))
    apply(operation)
  }

  /**
   * 粘贴时如何处理剪贴板文本到编辑器
   * 1. 忽略编辑器之身的粘贴
   * 2. 其他粘贴行为一律使用文本粘贴
   */
  newEditor.insertData = (data) => {
    if (data.types.includes('application/x-slate-fragment')) {
      return insertData(data)
    } else {
      insertText(data.getData('text/plain').trim())
    }
  }

  /**
   * 设置复制时设置文字片段格式
   */
  newEditor.setFragmentData = (data) => {
    setFragmentData(data)
    const plain = data.getData('text/plain').replaceAll(/[\s]/gi, '')
    data.setData('text/plain', plain)
  }

  newEditor.insertText = (text) => {
    insertText(text)
  }
  return newEditor
}
