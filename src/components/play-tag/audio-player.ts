export class AudioPlayer {
  private audio: HTMLAudioElement

  constructor() {
    this.audio = new Audio()
    this.audio.autoplay = false
    this.audio.volume = 0.5
  }

  load(src: string) {
    return new Promise<void>((resolve, reject) => {
      this.audio.src = src
      this.audio.addEventListener('canplaythrough', () => resolve(), { once: true })
      this.audio.addEventListener('error', (errorEvent) => reject(errorEvent.error), { once: true })
      this.audio.load()
    })
  }

  play() {
    return new Promise<void>((resolve, reject) => {
      this.audio.addEventListener('pause', () => resolve(), { once: true })
      this.audio.addEventListener('error', (errorEvent) => reject(errorEvent.error), { once: true })
      this.audio.play()
    })
  }

  pause() {
    this.audio.pause()
  }

  cancel() {
    this.audio.pause()
    this.audio.src = ''
  }

  stop() {
    this.audio.pause()
    this.audio.currentTime = 0
  }
}
