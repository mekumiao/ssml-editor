<script setup lang="ts">
import type { LabelValue } from '@/model'
import { provide, ref, watch } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import AudioUpload from './audio-upload.vue'

defineEmits<{ submit: [value: LabelValue] }>()
defineProps<{ text: string }>()

const boxRef = ref<HTMLElement>()
const audioUploadRef = ref()

const showText = ref<boolean>(true)
const showAudioUpload = ref<boolean>(false)

const visible = useElementVisibility(boxRef)

provide('reopen', () => {
  showText.value = true
  showAudioUpload.value = false
})

watch(visible, (newValue) => {
  if (!newValue) {
    showText.value = true
    showAudioUpload.value = false
  }
})

function handleOpenRecord() {
  showText.value = true
  showAudioUpload.value = true
}

async function handleOpenInputFile() {
  if (await audioUploadRef.value?.openInputFile()) {
    showText.value = false
    showAudioUpload.value = true
  }
}
</script>

<template>
  <div ref="boxRef" class="px-2 py-1" style="width: 410px">
    <section class="fw-bold" v-show="showText" style="font-size: 0.5rem">
      <p class="text-start text-danger">请在安静的环境中进行录音，以需要转换的风格，读出以下文案</p>
      <div class="border border-secondary rounded p-2 w-100" style="height: 100px">{{ text }}</div>
    </section>
    <section class="mt-2" v-show="!showAudioUpload">
      <div class="w-100 d-flex flex-column row-gap-1">
        <button @click="handleOpenRecord" class="btn btn-success">实时录音</button>
        <button @click="handleOpenInputFile" class="btn btn-primary">上传录音</button>
      </div>
      <p class="mt-2 text-secondary" style="font-size: 0.5rem">
        录音内容需要和滑选一致，音频限制60秒，滑选文案限制60个字
      </p>
    </section>
    <section v-show="showAudioUpload">
      <AudioUpload ref="audioUploadRef" @submit="(value) => $emit('submit', value)"></AudioUpload>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
