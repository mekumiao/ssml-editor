import type { IDomEditor } from '@wangeditor/editor'
import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { getConfig } from '@/config'
import throttle from 'lodash.throttle'

type SaveState = 'unsave' | 'saving' | 'saved'

export const useEditorStore = defineStore('--editor-config', () => {
  const config = getConfig()

  const _editor = shallowRef<IDomEditor>()
  const _saveState = ref<SaveState>('saved')

  const editor = computed(() => _editor.value)
  const saveState = computed(() => _saveState.value)

  const setEditor = (editor: IDomEditor) => {
    _editor.value = editor
  }

  const setSaveState = (state: SaveState) => {
    _saveState.value = state
  }

  const saveThrottle = throttle(
    async (htmlGetter: () => string) => {
      const saveHtml = config.editorConfig.saveHtml
      if (!saveHtml) return
      try {
        _saveState.value = 'saving'
        const rest = await saveHtml(htmlGetter)
        if (rest) {
          _saveState.value = 'saved'
        } else {
          _saveState.value = 'unsave'
        }
      } catch (error) {
        _saveState.value = 'unsave'
        throw error
      }
    },
    5000,
    { leading: false, trailing: true },
  )

  const saveEditorHtml = (htmlGetter: () => string) => {
    if (_saveState.value === 'saved') _saveState.value = 'unsave'
    saveThrottle(htmlGetter)
  }

  return { editor, saveState, setEditor, setSaveState, saveEditorHtml }
})
