import type { SSMLBaseElement } from '../base'

export interface Prosody extends SSMLBaseElement {
  type: 'ssml-prosody'
  contour?: string
  pitch?: string
  range?: string | 'x-low' | 'low' | 'medium' | 'high' | 'x-high' | 'default'
  rate?: number
  volume?: number | string | 'x-low' | 'low' | 'medium' | 'high' | 'x-high' | 'default'
}
