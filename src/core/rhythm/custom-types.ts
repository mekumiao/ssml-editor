import type { SSMLBaseElement } from '../base'

export interface Rhythm extends SSMLBaseElement {
  type: 'ssml-rhythm'
  time: string
}
