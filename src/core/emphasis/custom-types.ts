import type { SSMLBaseElement } from '../base'

export interface Emphasis extends SSMLBaseElement {
  type: 'ssml-emphasis'
  level?: 'reduced' | 'none' | 'moderate' | 'strong'
}
