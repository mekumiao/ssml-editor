import type { SSMLBaseElement } from '../base'

export interface Digital extends SSMLBaseElement {
  type: 'ssml-digital'
  interpretAs: string
  value: string
}
