import { ref, computed } from 'vue'

export class Timer {
  private isStop: boolean = false
  private readonly count = ref(0)
  private timeoutId: ReturnType<typeof setTimeout> | null = null

  public constructor(private timeoutSeconds: number = 60) {}

  private clearTimeout(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  public get state() {
    return computed(() => this.count.value)
  }

  public start(timeoutSeconds?: number) {
    if (timeoutSeconds) this.timeoutSeconds = timeoutSeconds
    this.isStop = false
    this.count.value = 0
    this.clearTimeout()
    this.timeoutId = setInterval(() => {
      if (!this.isStop && this.count.value < this.timeoutSeconds) {
        this.count.value++
      } else {
        this.clearTimeout()
      }
    }, 1000)
  }

  public stop() {
    this.isStop = true
    this.clearTimeout()
  }
}
