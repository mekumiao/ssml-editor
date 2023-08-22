import type { SSMLBaseElement } from '../base'

export interface English extends SSMLBaseElement {
  type: 'ssml-english'
  word: string
  phoneme: string
}
