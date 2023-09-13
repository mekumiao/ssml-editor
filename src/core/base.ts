import { type SlateElement } from '@wangeditor/editor'
import type { SSMLElementType } from './custom-types'

export type EmptyText = { text: '' }

export interface SSMLBaseElement extends SlateElement {
  type: SSMLElementType
  remark: string
}
