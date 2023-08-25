import type { SSMLBaseElement } from '../base'

export interface Voice extends SSMLBaseElement {
  type: 'ssml-voice'
  name: string
  effect?: string
}
