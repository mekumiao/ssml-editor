import type { LabelValue } from './label-value'

export interface Speaker extends LabelValue {
  id: string
  avatar: string
  isFree: boolean
  isStar: boolean
  isSupper24K: boolean
  roles: (LabelValue & { avatar?: string; emoji?: string })[]
  styles: (LabelValue & { avatar?: string; emoji?: string })[]
}

export function defaultSpeaker(): Speaker {
  return {
    id: '',
    avatar: '',
    isFree: false,
    isStar: false,
    isSupper24K: false,
    roles: [],
    styles: [],
    label: '',
    value: '',
  }
}

export interface FilterSpeaker {
  word: string
  category: string
  gender: string
  tag: string
}

export function defaultFilterSpeaker(): FilterSpeaker {
  return {
    word: '',
    category: '',
    gender: '',
    tag: '',
  }
}
