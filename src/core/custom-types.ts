import { type SlateElement } from '@wangeditor/editor'

type EmptyText = {
  text: ''
}

export type IdText = { id: string; text: string; remark: string }

type UnionTypesMap<T extends { type: string }> = T extends any ? T['type'] : never

export type SSMLElementType = UnionTypesMap<SayAs | Break | W | P | Sub | Prosody> | 'paragraph'

export interface SSMLBaseElement extends SlateElement {
  type: SSMLElementType
  domId: string
  remark: string
  bgColor: string
}

export interface SayAs extends SSMLBaseElement {
  type: 'ssml-say-as'
  interpretAs: string
}

export interface Break extends SSMLBaseElement {
  type: 'ssml-break'
  domId: string
  remark: string
  time: string
  children: EmptyText[]
  bgColor: string
}

export interface W extends SSMLBaseElement {
  type: 'ssml-w'
  phoneme?: string
  value?: string
}

export interface P extends SSMLBaseElement {
  type: 'ssml-p'
  word: string
  phoneme: string
}

export interface Sub extends SSMLBaseElement {
  type: 'ssml-sub'
  alias: string
  value: string
}

export interface Prosody extends SSMLBaseElement {
  type: 'ssml-prosody'
  rate: string
}
