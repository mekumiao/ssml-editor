import type { LabelValue } from '@/model'

export interface AnchorAvatarData extends LabelValue {
  src?: string
  isFree?: boolean
}

export interface StyleAvatarData extends LabelValue {
  src?: string
}

export function formatPitch(v: number) {
  return `${(0.05 * v * 100).toFixed(0)}%`
}

export function formatRate(v: number) {
  return `${((v - 1) * 100).toFixed(0)}%`
}
