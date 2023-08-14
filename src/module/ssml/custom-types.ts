import { type BaseElement } from 'slate'

type EmptyText = {
  text: ''
}

export interface Polyphone extends BaseElement {
  type: 'polyphone'
  value: string
  pinyin: string
  children: EmptyText[]
}

export interface Continuous extends BaseElement {
  type: 'continuous'
}

export interface SayAs extends BaseElement {
  type: 'say-as'
  interpret: 'name' | 'address' | 'characters' | 'digits'
}

export interface Break extends BaseElement {
  type: 'break'
  time: 'none' | 'short' | 'medium' | 'long'
  children: EmptyText[]
}

export interface Prosody extends BaseElement {
  type: 'prosody'
  rate: number
  volume: number
}
