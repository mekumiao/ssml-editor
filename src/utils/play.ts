export class AudioPlayer {
  private audio: HTMLAudioElement | null
  private src: string | null

  constructor() {
    this.audio = null
    this.src = null
  }

  private removeAudioElement() {
    if (this.audio) {
      document.body.removeChild(this.audio)
      this.audio = null
      this.src = null
    }
  }

  play(src: string) {
    this.stop()
    this.audio = document.createElement('audio')
    this.audio.hidden = true
    this.audio.volume = 0.5
    this.audio.src = src
    this.src = src
    document.body.appendChild(this.audio)
    this.audio.play()
  }

  stop(src?: string) {
    if (src && src !== this.src) return
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
      this.removeAudioElement()
    }
  }
}

const audioPlayer = new AudioPlayer()

export { audioPlayer }
