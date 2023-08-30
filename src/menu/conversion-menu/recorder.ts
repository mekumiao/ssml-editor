export class Recorder {
  private mediaRecorder: MediaRecorder | null = null

  public constructor() {}

  public get state() {
    return this.mediaRecorder?.state
  }

  public async start(): Promise<Blob> {
    if (navigator.mediaDevices.getUserMedia) {
      let chunks: Blob[] = []
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream)

        return new Promise<Blob>((resolve, reject) => {
          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data)
          }
          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/wav; codecs=opus' })
            // const audioURL = window.URL.createObjectURL(blob)
            resolve(blob)
          }
          mediaRecorder.onerror = (ev) => {
            reject(ev)
          }
          mediaRecorder.start()
        })
      } catch (error) {
        throw new Error('授权失败！请确保使用https访问网站', { cause: error })
      } finally {
        chunks = []
      }
    }
    throw Error('浏览器不支持 getUserMedia')
  }

  public stop(): void {
    if (this.mediaRecorder) this.mediaRecorder.stop()
  }
}
