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
    insertNode,
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
    normalizeNode(entry)
  }

  newEditor.apply = (operation) => {
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
      data.setData('text/html', data.getData('text/plain').trim())
      // 这里不能使用insertText()方法,否者会破坏段落结构
      return insertData(data)
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

  newEditor.insertNode = (node) => {
    insertNode(node)
  }

  return newEditor
}
