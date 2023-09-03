import type { LabelValue } from './label-value'

export interface Speaker {
  id: string
  name: string
  displayName: string
  category: string
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
    category: '',
    avatar: '',
    isFree: false,
    isStar: false,
    isSupper24K: false,
    roles: [],
    styles: [],
    name: '',
    displayName: '',
  }
}

export interface FilterSpeaker {
  word: string
  topFlag: string
  category: string
  gender: string
  tag: string
}

export function defaultFilterSpeaker(): FilterSpeaker {
  return {
    word: '',
    topFlag: '',
    category: '',
    gender: '',
    tag: '',
  }
}
