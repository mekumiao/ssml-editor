export {}

declare global {
  interface Window {}

  interface LabelValue {
    label: string
    value: string
  }
  interface SSMLEditorConfig {
    handleError: (error: string) => void
    fetchSpeaker: (word: string) => Promise<LabelValue[]>
    fetchEnglish: (word: string) => Promise<LabelValue[]>
  }
}
