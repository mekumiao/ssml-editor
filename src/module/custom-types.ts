import { type BaseElement } from 'slate'

type EmptyText = {
  text: ''
}

export type IdText = { id: string; text: string; remark: string }

export interface Speaker extends BaseElement {
  type: 'speaker'
  domId: string
  character: string
  pinyin: string
  children: EmptyText[]
}

export interface Continuous extends BaseElement {
  type: 'continuous'
  domId: string
}

export interface Read extends BaseElement {
  type: 'read'
  domId: string
  inId: string
  inText: string
  inRemark: string
}

export interface Digital extends BaseElement {
  type: 'digital'
  domId: string
  inId: string
  inText: string
  inRemark: string
}
