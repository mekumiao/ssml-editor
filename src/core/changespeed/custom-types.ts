import type { SSMLBaseElement } from '../base'

export interface Changespeed extends SSMLBaseElement {
  type: 'ssml-changespeed'
  rate: string
}
