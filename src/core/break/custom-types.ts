import type { EmptyText, SSMLBaseElement } from '../base'

export interface Break extends SSMLBaseElement {
  type: 'ssml-break'
  time?: string
  strength?: 'x-weak' | 'weak' | 'medium' | 'strong' | 'x-strong'
  children: EmptyText[]
}
