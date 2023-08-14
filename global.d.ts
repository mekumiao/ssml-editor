declare type IDomEditor = import('@wangeditor/editor').IDomEditor

declare global {
  interface Window {
    editor: IDomEditor
    SlateEditor: any
    DomEditor: any
    SlateTransforms: any
    SlateNode: any
    SlateText: any
    SlateRange: any
  }
}

export declare let editor: IDomEditor
