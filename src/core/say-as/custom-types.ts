import type { SSMLBaseElement } from '../base'

export interface SayAs extends SSMLBaseElement {
  type: 'ssml-say-as'
  interpretAs: string
  format?: string
  detail?: string
}
