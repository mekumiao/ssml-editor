import type { SSMLBaseElement } from '../base'

export interface MsttsBackgroundaudio extends SSMLBaseElement {
  type: 'ssml-mstts:backgroundaudio'
  src: string
  volume?: number
  fadein?: number
  fadeout?: number
}
