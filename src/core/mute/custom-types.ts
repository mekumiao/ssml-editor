import type { SSMLBaseElement } from '../base'

export interface Mute extends SSMLBaseElement {
  type: 'ssml-mute'
  time: string
}
