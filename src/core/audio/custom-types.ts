import type { SSMLBaseElement } from '../base'

export interface Audio extends SSMLBaseElement {
  type: 'ssml-audio'
  src: string
}
