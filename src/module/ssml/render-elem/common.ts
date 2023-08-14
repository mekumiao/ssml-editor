import { h, type VNode } from 'snabbdom'

type WrapType = 'continuous' | 'polyphone'

export function createWrap(
  type: WrapType,
  title: string,
  children: VNode | VNode[] | null,
  handler?: (evnet: MouseEvent) => void
): VNode {
  const noSelectStyle = { style: { userSelect: 'none' }, contentEditable: false }

  return h('span.ssml-wrap', [
    h(`span.noselect.tag.bg.${type}`, { ...noSelectStyle }, [
      h(`span.content.${type}`),
      h(
        'span.btn.btn-close',
        { on: { click: handler || (() => {}) } },
        h('span.iconfont.icon-roundclosefill', null)
      )
    ]),
    h(`span.boundary.start.color.${type}`, { ...noSelectStyle }),
    h('span', children),
    h(`span.boundary.end.color.${type}`, { ...noSelectStyle })
  ])
}

export function createWrapVoid(
  type: WrapType,
  title: string,
  value: string,
  handler?: (evnet: MouseEvent) => void
): VNode {
  const noSelectStyle = { style: { userSelect: 'none' }, contentEditable: false }

  return h('span.ssml-wrap', { ...noSelectStyle }, [
    h(`span.noselect.tag.bg.${type}`, [
      h('span', title),
      h(
        'span.btn.btn-close',
        { on: { click: handler || (() => {}) } },
        h('span.iconfont.icon-roundclosefill', null)
      )
    ]),
    h(`span.boundary.start.color.${type}`),
    h('span', value),
    h(`span.boundary.end.color.${type}`)
  ])
}
