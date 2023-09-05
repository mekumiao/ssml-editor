import { ref, computed } from 'vue'

export class AudioPlayer {
  private audio: HTMLAudioElement
  private readonly isPlaying = ref(false)
  private readonly isLoading = ref(false)
  private loadResolve: (() => void) | undefined
  private loadReject: (() => void) | undefined

  constructor() {
    this.audio = new Audio()

    this.audio.addEventListener('canplaythrough', () => {
      this.isLoading.value = false
      this.loadResolve?.()
      this.loadResolve = undefined
    })

    this.audio.addEventListener('play', () => {
      this.isPlaying.value = true
    })

    this.audio.addEventListener('pause', () => {
      this.isPlaying.value = false
    })

    this.audio.addEventListener('error', () => {
      this.isLoading.value = false
      this.isPlaying.value = false
      this.loadReject?.()
      this.loadReject = undefined
    })
  }

  load(audioSource: string): Promise<void> {
    this.pause()
    if (this.loadReject) this.loadReject()
    this.isPlaying.value = false
    this.isLoading.value = true
    this.audio.src = audioSource
    this.audio.load()
    return new Promise<void>((resolve, reject) => {
      this.loadResolve = resolve
      this.loadReject = reject
    })
  }

  play() {
    this.audio.play()
  }

  pause() {
    this.audio.pause()
  }

  togglePlayPause() {
    if (this.isPlaying.value) {
      this.pause()
    } else {
      this.play()
    }
  }

  get playState() {
    return computed(() => (this.isPlaying.value ? 'playing' : 'paused'))
  }

  get loadState() {
    return computed(() => (this.isLoading.value ? 'loading' : 'complete'))
  }
}

export default AudioPlayer
