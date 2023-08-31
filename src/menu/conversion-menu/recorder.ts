export class Recorder {
  private mediaRecorder: MediaRecorder | null = null

  public constructor() {}

  public get state() {
    return this.mediaRecorder?.state
  }

  public async start(): Promise<Blob> {
    if (navigator.mediaDevices.getUserMedia) {
      const chunks: Blob[] = []
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream)

        return new Promise<Blob>((resolve, reject) => {
          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data)
          }
          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/wav' })
            resolve(blob)
          }
          mediaRecorder.onerror = (ev) => {
            reject(ev)
          }
          mediaRecorder.start()
        })
      } catch (error) {
        console.error(error)
        throw new Error('授权失败！', { cause: error })
      }
    }
    throw Error('浏览器不支持 getUserMedia')
  }

  public stop(): void {
    if (this.mediaRecorder) this.mediaRecorder.stop()
  }
}
