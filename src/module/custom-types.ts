import { type BaseElement } from 'slate'

type EmptyText = {
  text: ''
}

export interface Polyphone extends BaseElement {
  type: 'polyphone'
  domId: string
  value: string
  pinyin: string
  children: EmptyText[]
}

export interface Continuous extends BaseElement {
  type: 'continuous'
  domId: string
}

export interface SayAs extends BaseElement {
  type: 'say-as'
  domId: string
  interpret: 'name' | 'address' | 'characters' | 'digits'
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
