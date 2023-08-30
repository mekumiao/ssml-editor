export interface AudioInfo {
  id: string
  src: string
}

export function defaultAudioInfo() {
  return { id: '', src: '' }
}
