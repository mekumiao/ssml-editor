import type { CancellationToken } from '@/utils'
import { computed, ref } from 'vue'

export class Recorder {
  private mediaRecorder: MediaRecorder | null = null
  private readonly isRecording = ref(false)

  public constructor() {}

  public get recorderState() {
    return computed(() => (this.isRecording.value ? 'recording' : 'paused'))
  }

  public async start(token: CancellationToken): Promise<File> {
    if (navigator.mediaDevices.getUserMedia) {
      const chunks: Blob[] = []
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream)
        this.mediaRecorder = mediaRecorder

        return new Promise<File>((resolve, reject) => {
          mediaRecorder.ondataavailable = (e) => {
            if (token.isCancellationRequested()) {
              mediaRecorder.stop()
              this.isRecording.value = false
              token.throwIfRequested()
            } else {
              chunks.push(e.data)
            }
          }
          mediaRecorder.onstart = () => {
            this.isRecording.value = true
          }
          mediaRecorder.onpause = () => {
            this.isRecording.value = false
          }
          mediaRecorder.onstop = () => {
            this.isRecording.value = false
            const fileName = `record-${new Date().getTime()}.wav`
            const file = new File(chunks, fileName, { type: 'audio/wav' })
            resolve(file)
          }
          mediaRecorder.onerror = (ev) => {
            this.isRecording.value = false
            reject(ev)
          }

          token.throwIfRequested()

          mediaRecorder.start()
        })
      } catch (error) {
        throw new Error('授权失败！', { cause: error })
      }
    }
    throw Error('浏览器不支持 getUserMedia')
  }

  public stop(): void {
    if (this.mediaRecorder) this.mediaRecorder.stop()
  }
}
