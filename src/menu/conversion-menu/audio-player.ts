import { ref, computed } from 'vue'

export class AudioPlayer {
  private audio: HTMLAudioElement
  private readonly isPlaying = ref(false)
  private readonly isLoading = ref(false)
  private readonly canplay = ref(false)
  private loadResolve: (() => void) | undefined
  private loadReject: (() => void) | undefined
  private timeout: NodeJS.Timeout | undefined
  private _currentTime = ref(0)

  constructor() {
    this.audio = new Audio()
    this.audio.autoplay = false

    this.audio.addEventListener('canplaythrough', () => {
      this.isLoading.value = false
      this.loadResolve?.()
      this.resetPromise()
    })

    this.audio.addEventListener('play', () => {
      this.isPlaying.value = true
    })

    this.audio.addEventListener('cancel', () => {
      this.canplay.value = false
      this.isLoading.value = false
    })

    this.audio.addEventListener('canplay', () => {
      this.canplay.value = true
    })

    this.audio.addEventListener('pause', () => {
      this.isPlaying.value = false
    })

    this.audio.addEventListener('error', () => {
      this.isLoading.value = false
      this.isPlaying.value = false
      this.canplay.value = false
      this.loadReject?.()
      this.resetPromise()
    })

    this.audio.addEventListener('timeupdate', () => {
      this._currentTime.value = this.audio.currentTime
    })
  }

  private resetPromise() {
    clearTimeout(this.timeout)
    this.timeout = undefined
    this.loadResolve = undefined
    this.loadReject = undefined
  }

  load(audioSource: string, timeoutMilliseconds: number = 10000): Promise<void> {
    this.pause()
    this.resetPromise()
    this.isPlaying.value = false
    this.isLoading.value = true
    this.canplay.value = false
    this.audio.src = audioSource
    this.audio.load()
    return new Promise<void>((resolve, reject) => {
      this.loadResolve = resolve
      this.loadReject = reject
      this.timeout = setTimeout(() => {
        this.pause()
        this.isPlaying.value = false
        this.isLoading.value = false
        reject(new Error(`加载音频超时`))
        this.resetPromise()
      }, timeoutMilliseconds)
    })
  }

  play() {
    this.canplay.value && this.audio.play()
  }

  pause() {
    this.audio.pause()
  }

  cancel() {
    this.pause()
    this.audio.src = ''
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

  get duration() {
    return computed(() => {
      if (this.isLoading.value) return 0
      return Number.isNaN(this.audio.duration) ? 0 : Math.ceil(this.audio.duration)
    })
  }

  get currentTime() {
    return computed({
      get: () => {
        if (this.isLoading.value) return 0
        return Number.isNaN(this._currentTime.value) ? 0 : Math.ceil(this._currentTime.value)
      },
      set: (v) => {
        if (Number.isNaN(v)) return
        this._currentTime.value = v
        this.audio.currentTime = v
      },
    })
  }
}

export default AudioPlayer
