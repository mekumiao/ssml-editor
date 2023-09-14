import type { LabelValue } from '@/model'

export const speed = () => [
  { value: '0.5', label: '0.5x' },
  { value: '0.6', label: '0.6x' },
  { value: '0.7', label: '0.7x' },
  { value: '0.8', label: '0.8x' },
  { value: '0.9', label: '0.9x' },
  { value: '1.0', label: '1.0x' },
  { value: '1.1', label: '1.1x' },
  { value: '1.2', label: '1.2x' },
  { value: '1.4', label: '1.4x' },
  { value: '1.5', label: '1.5x' },
  { value: '1.75', label: '1.75x' },
  { value: '2.0', label: '2.0x' },
]

export const pitch = () => [
  { value: '-10', label: '-10' },
  { value: '-9', label: '-9' },
  { value: '-8', label: '-8' },
  { value: '-7', label: '-7' },
  { value: '-6', label: '-6' },
  { value: '-5', label: '-5' },
  { value: '-4', label: '-4' },
  { value: '-3', label: '-3' },
  { value: '-2', label: '-2' },
  { value: '-1', label: '-1' },
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
]

export interface ContentData {
  category: string
  name: string
  role: string
  style: string
  speed: string
  pitch: string
}

export function defaultContentData(): ContentData {
  return {
    category: '',
    name: '',
    role: '',
    style: '',
    speed: '1.0',
    pitch: '0',
  }
}

export type SubmitData = ContentData & LabelValue

export interface RecentUsageSpeaker extends ContentData {
  id: string
  label: string
}

export function defaultRecentUsageSpeaker(): RecentUsageSpeaker {
  return { ...defaultContentData(), id: '', label: '' }
}
