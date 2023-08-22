import type { SSMLBaseElement } from '../base'

export interface Continuous extends SSMLBaseElement {
  type: 'ssml-continuous'
  value: string
}
