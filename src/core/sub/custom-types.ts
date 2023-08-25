import type { SSMLBaseElement } from '../base'

export interface Sub extends SSMLBaseElement {
  type: 'ssml-sub'
  alias: string
}
