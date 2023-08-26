import type { SSMLBaseElement } from '../base'

export interface Speak extends SSMLBaseElement {
  type: 'ssml-speak'
  version: '1.0'
  xmlLang: string
  xmlns: 'http://www.w3.org/2001/10/synthesis'
  'xmlns:mstts': 'http://www.w3.org/2001/mstts'
  'xmlns:emo': 'http://www.w3.org/2009/10/emotionml'
}
