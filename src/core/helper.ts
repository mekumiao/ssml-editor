import { SlateRange, type IDomEditor, SlateEditor, SlateTransforms } from '@wangeditor/editor'

export function selectionTrimEnd(editor: IDomEditor) {
  const { selection } = editor

  if (selection) {
    const [start, end] = SlateRange.edges(selection)
    const wordRange = SlateEditor.range(editor, start, end)
    const wordText = SlateEditor.string(editor, wordRange)

    const trimmedText = wordText.trimEnd()

    // 如果选中的是一个完整的单词（不包含末尾空格），则更新选区
    if (trimmedText !== wordText) {
      const offset = wordText.length - trimmedText.length
      const newEnd = { ...end, offset: end.offset - offset }
      const newSelection = { ...selection, anchor: start, focus: newEnd }

      SlateTransforms.select(editor, newSelection)
    }
  }
}
