import { type IDomEditor, DomEditor, SlateTransforms, SlateNode } from '@wangeditor/editor'
import { SlateEditor } from '@wangeditor/editor'
import { insertNodeSpace } from './helper'
import { Operation } from 'slate'
import { getEmitter } from '@/core/emitter'

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
    if (!Operation.isSelectionOperation(operation)) {
      getEmitter(editor)?.emit('ssml-update', editor)
    }
  }

  /**
   * 自定义剪贴板粘贴行为
   * 1. 放行编辑器自身的粘贴行为
   * 2. 其他粘贴行为一律使用文本粘贴
   */
  newEditor.insertData = (data) => {
    if (data.types.includes('application/x-slate-fragment')) {
      return insertData(data)
    } else {
      const copydata = new DataTransfer()
      copydata.setData('text/plain', data.getData('text/plain').trim())
      // 这里不能使用insertText()方法,否者会破坏段落结构
      return insertData(copydata)
    }
  }

  /**
   * 复制时设置文字片段格式
   */
  newEditor.setFragmentData = (data) => {
    setFragmentData(data)
    // const { selection } = editor
    // if (selection) {
    //   const plain = SlateEditor.string(editor, selection)
    //   data.setData('text/plain', editor.getText())
    // } else {
    //   setFragmentData(data)
    // }
  }

  newEditor.insertText = (text) => {
    insertText(text)
  }

  // 需要插入间隔的标签
  const SPACE_LIST_TYPES = [
    'ssml-prosody',
    'ssml-sub',
    'custom-management',
    'ssml-phoneme',
    'ssml-say-as',
  ]

  newEditor.insertNode = (node) => {
    const type = DomEditor.getNodeType(node)
    if (SPACE_LIST_TYPES.includes(type)) {
      // 插入间隔
      editor.selection && insertNodeSpace(editor, editor.selection)
      return SlateTransforms.insertNodes(editor, node)
    }

    if (type === 'ssml-audio' && SlateNode.string(node)) {
      // 插入间隔
      editor.selection && insertNodeSpace(editor, editor.selection)
      return SlateTransforms.insertNodes(editor, node)
    }

    if (SlateEditor.isVoid(editor, node)) {
      insertNode(node)
      return editor.move(1)
    }

    return insertNode(node)
  }

  return newEditor
}
