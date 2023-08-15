import { h, type VNode } from 'snabbdom'
import { SlateElement } from '@wangeditor/editor'
import type { Speaker, Continuous, Read } from './custom-types'

const noSelectStyle = { style: { userSelect: 'none' }, contentEditable: false }

export function renderSpeaker(elem: SlateElement): VNode {
  const { value, pinyin, domId, type } = elem as Speaker

  return h('span.ssml-wrap', { ...noSelectStyle }, [
    h(`span.tag.bg-color.${type}`, [
      h('span.tag-remark', { attrs: { 'data-tag-remark': pinyin } }),
      h(`span#${domId}.btn.btn-close`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.ft-color.${type}`),
    h('span', value),
    h(`span.boundary.end.ft-color.${type}`)
  ])
}

export function renderContinuous(elem: SlateElement, children: VNode[] | null): VNode {
  const { type, domId } = elem as Continuous

  return h('span.ssml-wrap', [
    h(`span.tag.bg-color.${type}`, { ...noSelectStyle }, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': '连读' } }),
      h(`span#${domId}.btn.btn-close`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.ft-color.${type}`, { ...noSelectStyle }),
    h('span', children),
    h(`span.boundary.end.ft-color.${type}`, { ...noSelectStyle })
  ])
}

export function renderRead(elem: SlateElement, children: VNode[] | null): VNode {
  const { type, domId, selecte } = elem as Read
  const remark = { z: '重', t: '拖', all: '重+拖' }[selecte]

  return h('span.ssml-wrap', [
    h(`span.tag.bg-color.${type}`, { ...noSelectStyle }, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': remark } }),
      h(`span#${domId}.btn.btn-close`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.ft-color.${type}`, { ...noSelectStyle }),
    h('span', children),
    h(`span.boundary.end.ft-color.${type}`, { ...noSelectStyle })
  ])
}

export const renderElems = [
  {
    type: 'speaker',
    renderElem: renderSpeaker
  },
  {
    type: 'continuous',
    renderElem: renderContinuous
  },
  {
    type: 'read',
    renderElem: renderRead
  }
]

export {}
