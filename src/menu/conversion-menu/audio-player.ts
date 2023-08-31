import { ref, computed } from 'vue';

export class AudioPlayer {
  private audio: HTMLAudioElement;
  public isPlaying = ref(false);

  constructor() {
    this.audio = new Audio();

    this.audio.addEventListener('play', () => {
      this.isPlaying.value = true;
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying.value = false;
    });
  }

  load(audioSource: string) {
    this.audio.src = audioSource;
    this.audio.load();
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  togglePlayPause() {
    if (this.isPlaying.value) {
      this.pause();
    } else {
      this.play();
    }
  }

  get playState() {
    return computed(() => (this.isPlaying.value ? 'playing' : 'paused'));
  }
}

export default AudioPlayer;
