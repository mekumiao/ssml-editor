import { h, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { P, W, SayAs, Break, Sub, Prosody, SSMLElementType } from './custom-types'

const noSelectStyle = { style: { userSelect: 'none' }, contentEditable: false }

function renderP(elem: SlateElement): VNode {
  const { domId, bgColor, remark, word } = elem as P

  return h('span.ssml-wrap', { ...noSelectStyle }, [
    h(`span.tag.bg-color.${bgColor}`, [
      h('span.tag-remark', { attrs: { 'data-tag-remark': remark } }),
      h(`span#${domId}.btn.btn-text`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.ft-color.${bgColor}`),
    h('span', word),
    h(`span.boundary.end.ft-color.${bgColor}`)
  ])
}

function renderW(elem: SlateElement, children: VNode[] | null): VNode {
  const { bgColor, domId, remark, value } = elem as W

  return h('span.ssml-wrap', !children ? { ...noSelectStyle } : {}, [
    h(`span.tag.bg-color.${bgColor}`, { ...noSelectStyle }, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': remark } }),
      h(`span#${domId}.btn.btn-text`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.ft-color.${bgColor}`, { ...noSelectStyle }),
    h('span', children || value),
    h(`span.boundary.end.ft-color.${bgColor}`, { ...noSelectStyle })
  ])
}

function renderSayAs(elem: SlateElement, children: VNode[] | null): VNode {
  const { bgColor, domId, remark } = elem as SayAs

  return h('span.ssml-wrap', [
    h(`span.tag.bg-color.${bgColor}`, { ...noSelectStyle }, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': remark } }),
      h(`span#${domId}.btn.btn-text`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.ft-color.${bgColor}`, { ...noSelectStyle }),
    h('span', children),
    h(`span.boundary.end.ft-color.${bgColor}`, { ...noSelectStyle })
  ])
}

function renderBreak(elem: SlateElement): VNode {
  const { domId, remark, bgColor } = elem as Break

  return h('span.ssml-wrap', [
    h(`span.tag.bg-color.${bgColor}`, { ...noSelectStyle }, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': remark } }),
      h(`span#${domId}.btn.btn-text`, h('span.iconfont.icon-roundclosefill', null))
    ])
  ])
}

function renderSub(elem: SlateElement): VNode {
  const { domId, remark, bgColor, value } = elem as Sub

  return h('span.ssml-wrap', { ...noSelectStyle }, [
    h(`span.tag.bg-color.${bgColor}`, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': remark } }),
      h(`span#${domId}.btn.btn-text`, h('span.iconfont.icon-roundclosefill'))
    ]),
    h(`span.boundary.start.ft-color.${bgColor}`),
    h('span', value),
    h(`span.boundary.end.ft-color.${bgColor}`)
  ])
  // return h('span.ssml-wrap', [
  //   h(`span.tag.bg-color.${bgColor}`, { ...noSelectStyle }, [
  //     h(`span.tag-remark`, { attrs: { 'data-tag-remark': remark } }),
  //     h(`span#${domId}.btn.btn-text`, h('span.iconfont.icon-roundclosefill'))
  //   ]),
  //   h(`span.tag-remark.ft-color.${bgColor}`, {
  //     ...noSelectStyle,
  //     attrs: { 'data-tag-remark': '<' }
  //   }),
  //   h('span', children),

  //   h(`span.tag-remark.ft-color.${bgColor}`, {
  //     ...noSelectStyle,
  //     attrs: { 'data-tag-remark': '>' }
  //   }),
  //   h(`span.boundary.start.ft-color.${bgColor}`, { ...noSelectStyle }, null),
  //   h('span.tag-remark', { ...noSelectStyle, attrs: { 'data-tag-remark': value } }),
  //   h(`span.boundary.end.ft-color.${bgColor}`, { ...noSelectStyle }, null)
  // ])
}

function renderProsody(elem: SlateElement, children: VNode[] | null): VNode {
  const { bgColor, domId, remark } = elem as Prosody

  return h('span.ssml-wrap', [
    h(`span.tag.bg-color.${bgColor}`, { ...noSelectStyle }, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': remark } }),
      h(`span#${domId}.btn.btn-text`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.ft-color.${bgColor}`, { ...noSelectStyle }),
    h('span', children),
    h(`span.boundary.end.ft-color.${bgColor}`, { ...noSelectStyle })
  ])
}

export const renderElems: {
  type: SSMLElementType
  renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor) => VNode
}[] = [
  {
    type: 'ssml-p',
    renderElem: renderP
  },
  {
    type: 'ssml-w',
    renderElem: renderW
  },
  {
    type: 'ssml-say-as',
    renderElem: renderSayAs
  },
  {
    type: 'ssml-break',
    renderElem: renderBreak
  },
  {
    type: 'ssml-sub',
    renderElem: renderSub
  },
  {
    type: 'ssml-prosody',
    renderElem: renderProsody
  }
]

export {}
