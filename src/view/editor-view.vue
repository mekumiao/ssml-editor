<script setup lang="ts">
import EditorTitle from './editor-title.vue'
import EditorCore from './editor-core.vue'
import BarView from './bar-view.vue'
import type { IDomEditor, IEditorConfig } from '@wangeditor/editor'
import { ref, shallowRef, provide, onUnmounted } from 'vue'
import { PROVIDER_KEY, WANGEDITOR_EVENT } from '@/constant'
import type { LabelValue } from '@/model'

const emit = defineEmits<{ onCreated: [editor: IDomEditor]; onChange: [editor: IDomEditor] }>()

const characterTotal = ref(0)
const editorRef = shallowRef<IDomEditor>()
const bgm = ref<LabelValue | null>(null)

provide(PROVIDER_KEY.EDITOR, editorRef)

const editorConfig = { maxLength: 5000, placeholder: '请输入内容...' } as IEditorConfig

onUnmounted(() => {
  editorRef.value?.destroy()
})

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
  emit('onCreated', editor)

  editor.on(WANGEDITOR_EVENT.UPDATE_BGM, (value: LabelValue) => {
    bgm.value = value
  })

  editor.on(WANGEDITOR_EVENT.REMOVE_BGM, () => {
    bgm.value = null
  })
}

const handleChange = (editor: IDomEditor) => {
  characterTotal.value = editor.getText().length
  emit('onChange', editor)
}
</script>

<template>
  <div class="editor-view">
    <EditorTitle
      :bgm="bgm"
      :character-total="characterTotal"
      :character-max="editorConfig.maxLength || 0"
    ></EditorTitle>
    <div class="editor-box">
      <BarView></BarView>
      <div class="editor-core-container shadow pt-1">
        <EditorCore
          :editor-config="editorConfig"
          @change="handleChange"
          @created="handleCreated"
        ></EditorCore>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-view {
  .editor-box {
    background-color: var(--tool-bg-color);

    .editor-core-container {
      margin: 0 auto;
      width: 60vw;
    }
  }
}
</style>
