import type { SSMLBaseElement } from '../base'

export interface CustomManagement extends SSMLBaseElement {
  type: 'custom-management'
  name: string
  role: string
  style: string
  rate: string
  pitch: string
}
