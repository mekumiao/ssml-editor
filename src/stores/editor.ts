import type { IDomEditor } from '@wangeditor/editor'
import { defineStore } from 'pinia'
import { computed, shallowRef } from 'vue'

export const useEditorStore = defineStore('--editor-config', () => {
  const _editor = shallowRef<IDomEditor>()

  const editor = computed(() => _editor.value)

  const setEditor = (editor: IDomEditor) => {
    _editor.value = editor
  }

  return { editor, setEditor }
})
