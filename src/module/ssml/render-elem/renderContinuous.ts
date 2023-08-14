import { h, type VNode } from 'snabbdom'
import { SlateElement } from '@wangeditor/editor'
import { noSelectStyle } from './common'
import type { Continuous } from '../custom-types'

// function renderContinuous(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
//   return createWrap('continuous', '连读', children)
// }

function renderContinuous(elem: SlateElement, children: VNode[] | null): VNode {
  const { type, domId } = elem as Continuous

  return h('span.ssml-wrap', [
    h(`span.noselect.tag.bg.${type}`, { ...noSelectStyle }, [
      h(`span.content.${type}`),
      h(`span#${domId}.btn.btn-close`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.color.${type}`, { ...noSelectStyle }),
    h('span', children),
    h(`span.boundary.end.color.${type}`, { ...noSelectStyle })
  ])
}

export default renderContinuous
