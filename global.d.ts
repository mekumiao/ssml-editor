export {}

declare global {
  interface Window {
    editor: import('@wangeditor/editor').IDomEditor
  }
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    highlightjs: (typeof import('@highlightjs/vue-plugin'))['default']['component']
  }
}
