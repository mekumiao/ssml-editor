import type { LabelValue } from '@/model'

export interface Filter {
  search: string
  menuKey: 'first' | 'second' | 'last'
  scene: string
  style: string
}

export interface SSMLEditorConfig {
  handleError: (error: string) => void
  fetchSpeaker: (word: string) => Promise<LabelValue[]>
  fetchEnglish: (word: string) => Promise<LabelValue[]>
  fetchBgm: (filter: Filter) => Promise<LabelValue[]>
  fetchSpecial: (filter: Filter) => Promise<LabelValue[]>
}
