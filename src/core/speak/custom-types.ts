import type { SSMLBaseElement } from '../base'

export interface Speak extends SSMLBaseElement {
  type: 'ssml-speak'
  version: string
  'xml:lang': string
  xmlns: string
  'xmlns:mstts': string
  'xmlns:emo': string
}

export function defaultSpeak(): Speak {
  return {
    type: 'ssml-speak',
    remark: '',
    version: '',
    'xml:lang': '',
    xmlns: '',
    'xmlns:mstts': '',
    'xmlns:emo': '',
    children: [],
  }
}
