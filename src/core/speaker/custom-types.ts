import type { SSMLBaseElement } from '../base'

export interface Speaker extends SSMLBaseElement {
  type: 'ssml-speaker'
  word: string
  phoneme: string
}
