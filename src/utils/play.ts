export class AudioPlayer {
  private audio: HTMLAudioElement

  constructor() {
    this.audio = new Audio()
    this.audio.autoplay = false
    this.audio.volume = 0.5
  }

  play(src: string) {
    this.audio.pause()
    this.audio.src = src
    this.audio.play()
  }

  stop() {
    this.audio.pause()
    this.audio.currentTime = 0
  }
}
