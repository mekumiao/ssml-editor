import { type SlateElement } from '@wangeditor/editor'

export type EmptyText = { text: '' }

export interface SSMLBaseElement extends SlateElement {
  type: string
  domId: string
  remark: string
  bgColor: string
}
