import type { SSMLBaseElement } from '../base'

export interface Special extends SSMLBaseElement {
  type: 'ssml-special'
  src: string
}
