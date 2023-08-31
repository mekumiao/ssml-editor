export class CancellationTokenSource {
  private cancelled: boolean = false
  private timeoutId: ReturnType<typeof setTimeout> | null = null

  constructor(private timeoutMilliseconds: number) {}

  get token(): CancellationToken {
    return {
      isCancellationRequested: () => this.cancelled,
    }
  }

  public cancel(): void {
    this.cancelled = true
    this.clearTimeout()
  }

  private clearTimeout(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  public startTimeout(): void {
    this.timeoutId = setTimeout(() => {
      this.cancel()
    }, this.timeoutMilliseconds)
  }
}

export interface CancellationToken {
  isCancellationRequested: () => boolean
}
