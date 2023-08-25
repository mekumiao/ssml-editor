import type { SSMLBaseElement } from '../base'

export interface MsttsExpressAs extends SSMLBaseElement {
  type: 'ssml-mstts:express-as'
  style: string
  styledegree?: number
  role?: string
}
