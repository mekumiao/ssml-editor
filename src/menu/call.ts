import { type IDomEditor } from '@wangeditor/editor'
import type { NodeEntry } from 'slate'
import { findByDomId } from './helper'
import type { SSMLBaseElement } from '@/core/base'

export function call<T extends SSMLBaseElement>(
  editor: IDomEditor,
  type: T['type'],
  domId: string,
  callback: (node: NodeEntry<T>) => void
) {
  const nodeEntity = findByDomId<T>(editor, type, domId)
  return nodeEntity && callback(nodeEntity)
}
