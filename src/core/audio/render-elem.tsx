import { jsx, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor, SlateTransforms, DomEditor } from '@wangeditor/editor'
import type { Audio } from './custom-types'
import { throttle } from 'lodash'
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
  return (
    <span className="ssml-wrapper">
      <span
        className="remark"
        contentEditable="false"
        style={{ 'background-color': 'var(--ssml-audio)' }}
      >
        <span
          className="iconfont icon-roundclosefill"
          on={{
            click: throttle((event: Event) => {
              event.preventDefault()
              audioPlayer.stop(src)
              const path = DomEditor.findPath(editor, elem)
              removeNodeSpace(editor, path)
              SlateTransforms.unwrapNodes(editor, { at: path })
            }),
          }}
        ></span>
        <span
          className="iconfont icon-play"
          on={{
            click: throttle((event: Event) => {
              event.preventDefault()
              audioPlayer.play(src)
            }),
          }}
        ></span>
        <span className="data-content" attrs={{ 'data-content': remark }}></span>
      </span>
      <span
        className="data-content"
        contentEditable="false"
        attrs={{ 'data-content': '{' }}
        style={{ color: 'var(--ssml-audio)' }}
      ></span>
      <span>{children}</span>
      <span
        className="data-content"
        contentEditable="false"
        attrs={{ 'data-content': '}' }}
        style={{ color: 'var(--ssml-audio)' }}
      ></span>
    </span>
  )
}

function renderVoidElement(elem: Audio, editor: IDomEditor) {
  const { remark, src } = elem
  return (
    <span className="ssml-wrapper" contentEditable="false">
      <span className="remark" style={{ 'background-color': 'var(--ssml-audio)' }}>
        <span
          className="iconfont icon-roundclosefill"
          on={{
            click: throttle((event: Event) => {
              event.preventDefault()
              audioPlayer.stop(src)
              const path = DomEditor.findPath(editor, elem)
              SlateTransforms.delete(editor, { at: path })
            }),
          }}
        ></span>
        <span
          className="iconfont icon-play"
          on={{
            click: throttle((event: Event) => {
              event.preventDefault()
              audioPlayer.play(src)
            }),
          }}
        ></span>
        <span className="data-content" attrs={{ 'data-content': remark }}></span>
      </span>
      <span className="iconfont icon-music" style={{ color: 'var(--ssml-audio)' }}></span>
    </span>
  )
}
