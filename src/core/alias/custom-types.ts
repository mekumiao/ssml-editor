import type { SSMLBaseElement } from '../base'

export interface Alias extends SSMLBaseElement {
  type: 'ssml-alias'
  alias: string
  value: string
}
