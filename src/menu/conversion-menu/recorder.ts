export class Recorder {
  // private readonly recordBtn: Element
  // private readonly player: Element

  // public constructor(recordBtn: Element, player: Element) {
  //   this.recordBtn = recordBtn
  //   this.player = player
  // }

  // private init() {}

  public record(): Promise<Blob[] | null> {
    return Promise.resolve([])
  }

  public stop(): void {}

  // public start() {
  //   if (navigator.mediaDevices.getUserMedia) {
  //     let chunks: Blob[] = []
  //     const constraints = { audio: true }
  //     navigator.mediaDevices.getUserMedia(constraints).then(
  //       (stream) => {
  //         console.log('授权成功！')

  //         const mediaRecorder = new MediaRecorder(stream)

  //         this.recordBtn.onclick = () => {
  //           if (mediaRecorder.state === 'recording') {
  //             mediaRecorder.stop()
  //             recordBtn.textContent = 'record'
  //             console.log('录音结束')
  //           } else {
  //             mediaRecorder.start()
  //             console.log('录音中...')
  //             recordBtn.textContent = 'stop'
  //           }
  //           console.log('录音器状态：', mediaRecorder.state)
  //         }

  //         mediaRecorder.ondataavailable = (e) => {
  //           chunks.push(e.data)
  //         }

  //         mediaRecorder.onstop = (e) => {
  //           const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
  //           chunks = []
  //           const audioURL = window.URL.createObjectURL(blob)
  //           this.player.src = audioURL
  //         }
  //       },
  //       () => {
  //         console.error('授权失败！')
  //       }
  //     )
  //   } else {
  //     console.error('浏览器不支持 getUserMedia')
  //   }
  // }
}
