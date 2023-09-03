import { h, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor, SlateTransforms, DomEditor } from '@wangeditor/editor'
import type { Audio } from './custom-types'
import throttle from 'lodash.throttle'
import { audioPlayer } from '@/utils'
import { removeNodeSpace } from '../helper'

export default {
  type: 'ssml-audio',
  renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor) => {
    return children
      ? renderElement(elem as Audio, children, editor)
      : renderVoidElement(elem as Audio, editor)
  },
}

function renderElement(elem: Audio, children: VNode[], editor: IDomEditor) {
  const { remark, src } = elem
  return h('span.ssml-wrapper', [
    h(
      `span.remark`,
      {
        props: { contentEditable: false },
        style: {
          backgroundColor: 'var(--ssml-audio)',
        },
      },
      [
        h(`span.iconfont.icon-roundclosefill`, {
          on: {
            click: throttle((event: Event) => {
              event.preventDefault()
              audioPlayer.stop(src)
              const path = DomEditor.findPath(editor, elem)
              removeNodeSpace(editor, path)
              SlateTransforms.unwrapNodes(editor, { at: path })
            }),
          },
        }),
        h(`span.iconfont.icon-play`, {
          on: {
            click: throttle((event: Event) => {
              event.preventDefault()
              audioPlayer.play(src)
            }),
          },
        }),
        h(`span.data-content`, { attrs: { 'data-content': remark } }),
      ],
    ),
    h(`span.data-content`, {
      props: { contentEditable: false },
      attrs: { 'data-content': '{' },
      style: { color: `var(--ssml-audio)` },
    }),
    h('span', children),
    h(`span.data-content`, {
      props: { contentEditable: false },
      attrs: { 'data-content': '}' },
      style: { color: 'var(--ssml-audio)' },
    }),
  ])
}

function renderVoidElement(elem: Audio, editor: IDomEditor) {
  const { remark, src } = elem
  return h(
    'span.ssml-wrapper',
    {
      props: { contentEditable: false },
    },
    [
      h(
        `span.remark`,
        {
          style: {
            backgroundColor: 'var(--ssml-audio)',
          },
        },
        [
          h(`span.iconfont.icon-roundclosefill`, {
            on: {
              click: throttle((event: Event) => {
                event.preventDefault()
                audioPlayer.stop(src)
                const path = DomEditor.findPath(editor, elem)
                SlateTransforms.delete(editor, { at: path })
              }),
            },
          }),
          h(`span.iconfont.icon-play`, {
            on: {
              click: throttle((event: Event) => {
                event.preventDefault()
                audioPlayer.play(src)
              }),
            },
          }),
          h(`span.data-content`, { attrs: { 'data-content': remark } }),
        ],
      ),
      h(`span.iconfont.icon-music`, {
        style: { color: `var(--ssml-audio)` },
      }),
    ],
  )
}
