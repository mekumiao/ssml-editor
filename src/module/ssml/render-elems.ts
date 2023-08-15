import { h, type VNode } from 'snabbdom'
import { SlateElement } from '@wangeditor/editor'
import type { Polyphone, Continuous, SayAs } from './custom-types'

const noSelectStyle = { style: { userSelect: 'none' }, contentEditable: false }

export function renderPolyphone(elem: SlateElement): VNode {
  const { value, pinyin, domId, type } = elem as Polyphone

  return h('span.ssml-wrap', { ...noSelectStyle }, [
    h(`span.noselect.tag.bg.${type}`, [
      h('span.tag-remark', { attrs: { 'data-tag-remark': pinyin } }),
      h(`span#${domId}.btn.btn-close`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.color.${type}`),
    h('span', value),
    h(`span.boundary.end.color.${type}`)
  ])
}

export function renderContinuous(elem: SlateElement, children: VNode[] | null): VNode {
  const { type, domId } = elem as Continuous

  return h('span.ssml-wrap', [
    h(`span.noselect.tag.bg.${type}`, { ...noSelectStyle }, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': '连读' } }),
      h(`span#${domId}.btn.btn-close`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.color.${type}`, { ...noSelectStyle }),
    h('span', children),
    h(`span.boundary.end.color.${type}`, { ...noSelectStyle })
  ])
}

export function renderSayAs(elem: SlateElement, children: VNode[] | null): VNode {
  const { type, domId, interpret } = elem as SayAs

  return h('span.ssml-wrap', [
    h(`span.noselect.tag.bg.${type}.${interpret}`, { ...noSelectStyle }, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': interpret } }),
      h(`span#${domId}.btn.btn-close`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.color.${type}`, { ...noSelectStyle }),
    h('span', children),
    h(`span.boundary.end.color.${type}`, { ...noSelectStyle })
  ])
}

export const renderElems = [
  {
    type: 'polyphone',
    renderElem: renderPolyphone
  },
  {
    type: 'continuous',
    renderElem: renderContinuous
  },
  {
    type: 'say-as',
    renderElem: renderSayAs
  }
]

export {}
