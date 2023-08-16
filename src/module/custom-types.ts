import { type BaseElement } from 'slate'

type EmptyText = {
  text: ''
}

export type IdText = { id: string; text: string; remark: string }

export interface SayAs extends BaseElement {
  type: 'ssml-say-as'
  domId: string
  remark: string
  interpretAs: string
  bgColor: string
}

export interface Break extends BaseElement {
  type: 'ssml-break'
  domId: string
  remark: string
  time: string
  children: EmptyText[]
  bgColor: string
}

export interface W extends BaseElement {
  type: 'ssml-w'
  domId: string
  remark: string
  phoneme?: string
  value?: string
  bgColor: string
}

export interface P extends BaseElement {
  type: 'ssml-p'
  domId: string
  remark: string
  word: string
  phoneme: string
  bgColor: string
}

export interface Sub extends BaseElement {
  type: 'ssml-sub'
  domId: string
  remark: string
  alias: string
  value: string
  bgColor: string
}

export interface Prosody extends BaseElement {
  type: 'ssml-prosody'
  domId: string
  remark: string
  rate: string
  bgColor: string
}
