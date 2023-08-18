import {
  SlateEditor,
  type IDomEditor,
  SlateElement,
  DomEditor,
  SlateText,
  SlateTransforms,
  SlatePath
} from '@wangeditor/editor'
import throttle from 'lodash.throttle'
import $ from '@/utils/dom'
import type { NodeEntry } from 'slate'
import type { SSMLBaseElement } from '@/core/custom-types'

export type BindButtonType = 'close' | 'play'

export function bind<T extends SSMLBaseElement>(
  editor: IDomEditor,
  btnType: BindButtonType,
  type: T['type'],
  domId: string,
  callback: (node: NodeEntry<T>) => void
) {
  $('body').on(
    'click',
    `#${domId}-${btnType}`,
    throttle((event: Event) => {
      event.preventDefault()
      const nodeEntity = findByDomId<T>(editor, type, domId)
      return nodeEntity && callback(nodeEntity)
    })
  )
}

export function bindClose<T extends SSMLBaseElement>(
  editor: IDomEditor,
  type: T['type'],
  domId: string,
  callback: (node: NodeEntry<T>) => void
) {
  return bind<T>(editor, 'close', type, domId, callback)
}

export function bindPlay<T extends SSMLBaseElement>(
  editor: IDomEditor,
  type: T['type'],
  domId: string,
  callback: (node: NodeEntry<T>) => void
) {
  return bind<T>(editor, 'play', type, domId, callback)
}

export function findByDomId<T extends SSMLBaseElement>(
  editor: IDomEditor,
  type: T['type'],
  domId: string
): NodeEntry<T> | null {
  const [nodeEntity] = SlateEditor.nodes<T>(editor, {
    at: [],
    match: (n) => {
      if (!SlateElement.isElement(n)) return false
      if (!DomEditor.checkNodeType(n, type)) return false
      return (n as any).domId === domId
    }
  })
  return nodeEntity
}

export function unpackVoid<T extends SSMLBaseElement>(
  editor: IDomEditor,
  current: NodeEntry<T>,
  getter: (elem: T) => string
) {
  const preNodeEntity = SlateEditor.previous(editor, {
    at: current[1],
    match: (n) => SlateText.isText(n)
  })
  if (preNodeEntity == null) return

  SlateTransforms.insertText(editor, getter(current[0]), {
    at: SlateEditor.end(editor, preNodeEntity[1])
  })
  SlateTransforms.delete(editor, { at: SlatePath.next(preNodeEntity[1]) })
}
