import type { IDomEditor } from '@wangeditor/editor'
import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { getConfig, type SSMLEditorConfig } from '@/config'
import throttle from 'lodash.throttle'

type SaveState = 'unsave' | 'saving' | 'saved'

export const useEditorStore = defineStore('--editor-config', () => {
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

  const _saveEditorHtml = async (config: SSMLEditorConfig, htmlGetter: () => string) => {
    const saveHtml = config.editorConfig.saveHtml
    if (!saveHtml || _saveState.value !== 'unsave') return
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
  }

  let _saveEditorHtmlWithThrottle: ReturnType<typeof genSaveEditorHtmlWithThrottle> | undefined

  const genSaveEditorHtmlWithThrottle = (wait: number) => {
    return throttle(_saveEditorHtml, wait, {
      leading: false,
      trailing: true,
    })
  }

  const saveEditorHtml = (key: symbol, htmlGetter: () => string, isThrottle: boolean = true) => {
    const config = getConfig(key)
    if (!_saveEditorHtmlWithThrottle) {
      _saveEditorHtmlWithThrottle = genSaveEditorHtmlWithThrottle(config.editorConfig.autoSaveWait)
    }

    if (_saveState.value === 'saved') _saveState.value = 'unsave'
    return isThrottle
      ? _saveEditorHtmlWithThrottle(getConfig(key), htmlGetter)
      : _saveEditorHtml(getConfig(key), htmlGetter)
  }

  return { editor, saveState, setEditor, setSaveState, saveEditorHtml }
})
