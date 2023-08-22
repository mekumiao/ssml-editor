import type { LabelValue } from '@/model'

export interface SSMLEditorConfig {
  handleError: (error: string) => void
  fetchSpeaker: (word: string) => Promise<LabelValue[]>
  fetchEnglish: (word: string) => Promise<LabelValue[]>
}
