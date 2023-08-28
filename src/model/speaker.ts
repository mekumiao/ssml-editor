import type { LabelValue } from './label-value'

export interface Speaker extends LabelValue {
  avatar: string
  isFree: boolean
  isStar: boolean
  isSupper24K: boolean
  roles: LabelValue[]
  styles: (LabelValue & { avatar: string })[]
}

export function defaultSpeaker(): Speaker {
  return {
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
