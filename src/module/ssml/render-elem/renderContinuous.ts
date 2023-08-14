import { type VNode } from 'snabbdom'
import { SlateElement } from '@wangeditor/editor'
import { createWrap } from './common'

// function renderContinuous(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
//   return createWrap('continuous', '连读', children)
// }

function renderContinuous(elem: SlateElement, children: VNode[] | null): VNode {
  return createWrap('continuous', '连读', children)
}

export default renderContinuous
