import { type BaseElement } from 'slate'

type EmptyText = {
  text: ''
}

export interface Speaker extends BaseElement {
  type: 'speaker'
  domId: string
  value: string
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
  selecte: 'z' | 't' | 'all'
}

export interface Break extends BaseElement {
  type: 'break'
  domId: string
  time: 'none' | 'short' | 'medium' | 'long'
  children: EmptyText[]
}

export interface Prosody extends BaseElement {
  type: 'prosody'
  domId: string
  rate: number
  volume: number
}
