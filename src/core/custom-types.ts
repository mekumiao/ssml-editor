import { type SlateElement } from '@wangeditor/editor'

type EmptyText = {
  text: ''
}

export type IdText = { id: string; text: string; remark: string }

export interface SayAs extends SlateElement {
  type: 'ssml-say-as'
  domId: string
  remark: string
  interpretAs: string
  bgColor: string
}

export interface Break extends SlateElement {
  type: 'ssml-break'
  domId: string
  remark: string
  time: string
  children: EmptyText[]
  bgColor: string
}

export interface W extends SlateElement {
  type: 'ssml-w'
  domId: string
  remark: string
  phoneme?: string
  value?: string
  bgColor: string
}

export interface P extends SlateElement {
  type: 'ssml-p'
  domId: string
  remark: string
  word: string
  phoneme: string
  bgColor: string
}

export interface Sub extends SlateElement {
  type: 'ssml-sub'
  domId: string
  remark: string
  alias: string
  value: string
  bgColor: string
}

export interface Prosody extends SlateElement {
  type: 'ssml-prosody'
  domId: string
  remark: string
  rate: string
  bgColor: string
}
