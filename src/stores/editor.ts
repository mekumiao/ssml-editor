import type { IDomEditor } from '@wangeditor/editor'
import { defineStore } from 'pinia'
import { computed, shallowRef } from 'vue'
import { type GlobalEditorConfig, createGlobalEditorConfig } from '@/config'

export const useEditorStore = defineStore('--editor', () => {
  const _editor = shallowRef<IDomEditor>()
  const _globalEditConfig = shallowRef<GlobalEditorConfig>()

  const editor = computed(() => _editor.value)

  const globalEditConfig = computed(() => {
    if (_globalEditConfig.value) {
      return _globalEditConfig.value
    }
    throw Error('请设置GlobalEditorConfig')
  })

  const setEditor = (editor: IDomEditor) => {
    _editor.value = editor
  }

  const setGlobalEditConfig = (globalConfig?: GlobalEditorConfig) => {
    _globalEditConfig.value = globalConfig ?? createGlobalEditorConfig()
  }

  return { editor, globalEditConfig, setEditor, setGlobalEditConfig }
})
