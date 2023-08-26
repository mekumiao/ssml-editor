export {}

declare global {
  interface Window {
    editor: import('@wangeditor/editor').IDomEditor
  }
}
