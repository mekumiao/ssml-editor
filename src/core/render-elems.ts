import { h, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type {
  P,
  W,
  SayAs,
  Break,
  Sub,
  Prosody,
  SSMLElementType,
  Audio,
  SSMLBaseElement
} from './custom-types'

const noSelectStyle = { style: { userSelect: 'none' }, contentEditable: false }

function createVoid(args: SSMLBaseElement & { plain: string }) {
  return h('span.ssml-wrap', [
    h(`span.tag.bg-color.${args.bgColor}`, { ...noSelectStyle }, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': args.remark } }),
      h(`span#${args.domId}-close.btn-close`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.ft-color.${args.bgColor}`, { ...noSelectStyle }),
    h('span', args.plain),
    h(`span.boundary.end.ft-color.${args.bgColor}`, { ...noSelectStyle })
  ])
}

function createWithChildren(args: SSMLBaseElement, children: VNode[]) {
  return h('span.ssml-wrap', [
    h(`span.tag.bg-color.${args.bgColor}`, { ...noSelectStyle }, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': args.remark } }),
      h(`span#${args.domId}-close.btn-close`, h('span.iconfont.icon-roundclosefill', null))
    ]),
    h(`span.boundary.start.ft-color.${args.bgColor}`, { ...noSelectStyle }),
    h('span', children),
    h(`span.boundary.end.ft-color.${args.bgColor}`, { ...noSelectStyle })
  ])
}

function createSingle(args: SSMLBaseElement) {
  return h('span.ssml-wrap', [
    h(`span.tag.bg-color.${args.bgColor}`, { ...noSelectStyle }, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': args.remark } }),
      h(`span#${args.domId}-close.btn-close`, h('span.iconfont.icon-roundclosefill', null))
    ])
  ])
}

function createSingleWithPlay(args: SSMLBaseElement) {
  return h('span.ssml-wrap', [
    h(`span.tag.bg-color.${args.bgColor}`, { ...noSelectStyle }, [
      h(`span#${args.domId}-play.btn-text`, h('span.iconfont.icon-play', null)),
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': args.remark } }),
      h(`span#${args.domId}-close.btn-text`, h('span.iconfont.icon-roundclosefill', null))
    ])
  ])
}

function renderP(elem: SlateElement): VNode {
  const el = elem as P
  return createVoid({ ...el, plain: el.word })
}

function renderW(elem: SlateElement, children: VNode[] | null): VNode {
  if (children) {
    return createWithChildren(elem as W, children)
  }
  const el = elem as W
  return createVoid({ ...el, plain: el.value! })
}

function renderSayAs(elem: SlateElement, children: VNode[] | null): VNode {
  if (!children) throw Error('children is not null')
  return createWithChildren(elem as SayAs, children)
}

function renderBreak(elem: SlateElement): VNode {
  return createSingle(elem as Break)
}

function renderSub(elem: SlateElement): VNode {
  const el = elem as Sub
  return createVoid({ ...el, plain: el.value })
}

function renderProsody(elem: SlateElement, children: VNode[] | null): VNode {
  if (!children) throw Error('children is not null')
  return createWithChildren(elem as Prosody, children)
}

function renderAudio(elem: SlateElement): VNode {
  return createSingleWithPlay(elem as Audio)
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
  },
  {
    type: 'ssml-audio',
    renderElem: renderAudio
  }
]

export {}
