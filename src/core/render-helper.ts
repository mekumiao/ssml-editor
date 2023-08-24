import { h, type VNode } from 'snabbdom'
import type { SSMLBaseElement } from './base'
import throttle from 'lodash.throttle'

export const userSelectNo = { style: { userSelect: 'none' }, contentEditable: false }

export function createVoid(
  args: SSMLBaseElement & { plain: string },
  close: (event: Event) => void
) {
  return h('span.ssml-wrap', { ...userSelectNo }, [
    h(`span.tag.bg-color.${args.bgColor}`, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': args.remark } }),
      h(
        `span.btn-close`,
        {
          on: {
            click: throttle((event: Event) => {
              event.preventDefault()
              close(event)
            })
          }
        },
        h('span.iconfont.icon-roundclosefill')
      )
    ]),
    h(`span.boundary.start.ft-color.${args.bgColor}`),
    h('span', args.plain),
    h(`span.boundary.end.ft-color.${args.bgColor}`)
  ])
}

export function createWithChildren(
  args: SSMLBaseElement,
  children: VNode[] | null,
  close: (event: Event) => void
) {
  return h('span.ssml-wrap', [
    h(`span.tag.bg-color.${args.bgColor}`, { ...userSelectNo }, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': args.remark } }),
      h(
        `span.btn-close`,
        {
          on: {
            click: throttle((event: Event) => {
              event.preventDefault()
              close(event)
            })
          }
        },
        h('span.iconfont.icon-roundclosefill', null)
      )
    ]),
    h(`span.boundary.start.ft-color.${args.bgColor}`, { ...userSelectNo }),
    h('span', children),
    h(`span.boundary.end.ft-color.${args.bgColor}`, { ...userSelectNo })
  ])
}

export function createSingle(args: SSMLBaseElement, close: (event: Event) => void) {
  return h('span.ssml-wrap', { ...userSelectNo }, [
    h(`span.tag.bg-color.${args.bgColor}`, [
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': args.remark } }),
      h(
        `span.btn-close`,
        {
          on: {
            click: throttle((event: Event) => {
              event.preventDefault()
              close(event)
            })
          }
        },
        h('span.iconfont.icon-roundclosefill', null)
      )
    ])
  ])
}

export function createSingleWithPlay(
  args: SSMLBaseElement,
  on?: {
    close: (event: Event) => void
    play: (event: Event) => void
  }
) {
  return h('span.ssml-wrap', { ...userSelectNo }, [
    h(`span.tag.bg-color.${args.bgColor}`, [
      h(
        `span.btn-text`,
        {
          on: {
            click: throttle((event: Event) => {
              event.preventDefault()
              on?.play(event)
            })
          }
        },
        h('span.iconfont.icon-play', null)
      ),
      h(`span.tag-remark`, { attrs: { 'data-tag-remark': args.remark } }),
      h(
        `span.btn-text`,
        {
          on: {
            click: throttle((event: Event) => {
              event.preventDefault()
              on?.close(event)
            })
          }
        },
        h('span.iconfont.icon-roundclosefill', null)
      )
    ])
  ])
}
