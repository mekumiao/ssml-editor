import { h, type VNode } from 'snabbdom'
import { SlateElement } from '@wangeditor/editor'
import type { Polyphone } from '../custom-types'
import { noSelectStyle } from './common'

function renderPolyphone(elem: SlateElement): VNode {
  const { value, pinyin, domId, type } = elem as Polyphone

  return h('span.ssml-wrap', { ...noSelectStyle }, [
    h(`span.noselect.tag.bg.${type}`, [
      h('span', pinyin),
      h(`span#${domId}.btn.btn-close`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.color.${type}`),
    h('span', value),
    h(`span.boundary.end.color.${type}`)
  ])
}

export default renderPolyphone
