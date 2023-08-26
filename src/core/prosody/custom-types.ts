import type { SSMLBaseElement } from '../base'

export interface Prosody extends SSMLBaseElement {
  type: 'ssml-prosody'
  contour?: string
  pitch?: string
  range?: string
  rate?: string
  volume?: string
}
