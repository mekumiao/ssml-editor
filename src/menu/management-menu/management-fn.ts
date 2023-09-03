import {
  SlateRange,
  type IDomEditor,
  DomEditor,
  SlateEditor,
  SlateTransforms,
} from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { WANGEDITOR_EVENT } from '@/constant'
import type { CustomManagement } from '@/core'
import type { ContentData, SubmitData } from './data'

export class ManagementFn extends BaseFn {
  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (selection == null) return true

    if (DomEditor.getSelectedNodeByType(this.editor, 'custom-management')) {
      return false
    }

    if (SlateRange.isCollapsed(selection)) {
      this.editor.emit(WANGEDITOR_EVENT.ERROR, '请框选句子')
      return true
    }

    const [currentNode] = SlateEditor.node(this.editor, selection)
    const parentNode = this.editor.getParentNode(currentNode)
    if (!parentNode || !DomEditor.checkNodeType(parentNode, 'paragraph')) {
      this.editor.emit(WANGEDITOR_EVENT.ERROR, '多人配音需要在最外层使用')
      return true
    }

    return false
  }

  public contentData: ContentData | undefined

  exec(opt: SubmitData) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return
    const value = this.getValue()
    if (value == null) return

    const node = DomEditor.getSelectedNodeByType(this.editor, 'custom-management')
    if (node) {
      SlateTransforms.setNodes(
        this.editor,
        <Partial<CustomManagement>>{
          custom: { contentData: this.contentData || {} },
          remark: opt.label,
          name: opt.value,
          role: opt.role,
          style: opt.style,
          rate: opt.speed,
          pitch: opt.pitch,
        },
        {
          at: DomEditor.findPath(this.editor, node),
        },
      )
    } else {
      const elem: CustomManagement = {
        type: 'custom-management',
        custom: { contentData: this.contentData || {} },
        remark: opt.label,
        name: opt.value,
        role: opt.role,
        style: opt.style,
        rate: opt.speed,
        pitch: opt.pitch,
        children: [{ text: value }],
      }
      this.editor.insertNode(elem)
    }
  }
}
