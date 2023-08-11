declare type IDomEditor = import('@wangeditor/editor').IDomEditor

declare global {
  interface Window {
    editor: IDomEditor
  }
}

export declare let editor: IDomEditor
