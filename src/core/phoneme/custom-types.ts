import type { SSMLBaseElement } from '../base'

export interface Phoneme extends SSMLBaseElement {
  type: 'ssml-phoneme'
  alphabet?: string
  ph: string
}
