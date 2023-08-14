import { h, type VNode } from 'snabbdom'
import { SlateElement } from '@wangeditor/editor'
import type { Polyphone } from '../custom-types'
import { createWrapVoid } from './common'

function renderPolyphone(elem: SlateElement): VNode {
  const { value, pinyin } = elem as Polyphone
  return createWrapVoid('polyphone', pinyin, value)
}

export default renderPolyphone
