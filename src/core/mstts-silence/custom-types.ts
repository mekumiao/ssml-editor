import type { SSMLBaseElement } from '../base'

export interface MsttsSilence extends SSMLBaseElement {
  type: 'ssml-mstts:silence'
  attrType: string
  value: string
}
