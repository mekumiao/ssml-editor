export class FileSelector {
  private readonly id: string
  private readonly accept: string
  private dom: HTMLInputElement | null
  private isdestroy = false
  private resolve: ((value: File | PromiseLike<File>) => void) | null
  private reject: ((reason?: any) => void) | null

  public constructor(id: string, accept: string) {
    this.id = `--editor-input-file-${id}`
    this.accept = accept
    this.dom = null
    this.resolve = null
    this.reject = null
  }

  private createInputElement() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = this.accept
    input.hidden = true
    return input
  }

  private change(ev: Event) {
    if (this.dom && this.dom.files && this.dom.files.length > 0) {
      const file = this.dom.files.item(0)
      if (file) {
        this.resolve?.(file)
        this.dom.value = ''
        return
      }
      this.dom.value = ''
    }
    return this.reject?.(ev)
  }

  private cancel(ev: Event) {
    if (this.dom) this.dom.value = ''
    return this.reject?.(ev)
  }

  public open() {
    if (this.isdestroy) throw Error('对象已经销毁')
    if (!this.dom) {
      this.dom = this.createInputElement()
      this.dom.addEventListener('change', this.change.bind(this))
      this.dom.addEventListener('cancel', this.cancel.bind(this))
      document.body.appendChild(this.dom)
    }
    this.dom.click()
    const This = this
    return new Promise<File>((resolve, reject) => {
      This.resolve = resolve
      This.reject = reject
    })
  }

  public destroy() {
    if (this.isdestroy) return
    this.dom && document.body.removeChild(this.dom)
    this.dom = null
    this.isdestroy = true
  }
}
