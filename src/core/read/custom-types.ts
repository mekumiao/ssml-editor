import type { SSMLBaseElement } from '../base'

export interface Read extends SSMLBaseElement {
  type: 'ssml-read'
  phoneme: string
  value: string
}
