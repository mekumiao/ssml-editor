<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import SpeakerItem from './speaker-item.vue'

type AudioFile = { name: string; path?: string }

// const emit = defineEmits<{ 'update:visible': [value: boolean] }>()
// const props = defineProps<{ isUpload: boolean; visible: boolean }>()

const audioFile = ref<AudioFile>()

const selectedFile = shallowRef()

onMounted(() => {
  const fileInput = document.getElementById('conversion_UploadAudioInputFile')
  if (!fileInput) throw Error('未找到id:conversion_UploadAudioInputFile的元素')
  fileInput.addEventListener('change', (event) => {
    if (!event.target) return
    // @ts-ignore
    const file = event.target.files[0]
    if (file) {
      selectedFile.value = file
      console.log('已选择文件:', file.name)
    }
  })
})

function inputFile() {
  document.getElementById('conversion_UploadAudioInputFile')?.click()
}

defineExpose({
  inputFile
})
</script>

<template>
  <div class="audio-upload">
    <input type="file" id="conversion_UploadAudioInputFile" hidden />
    <div class="border rounded-pill border-secondary d-flex flex-row justify-content-between">
      <template>
        <div class="d-flex flex-row align-items-center">
          <div>图标</div>
          <div>{{ audioFile?.name }}</div>
        </div>
        <div>
          <div>删除</div>
          <button>上传音频</button>
        </div>
      </template>
      <template>
        <span class="text-secondary" style="font-size: 0.5rem">点击选择文件</span>
        <button class="btn btn-primary"></button>
      </template>
      <template>
        <span class="text-secondary" style="font-size: 0.5rem">点击开始录音</span>
        <button class="btn btn-primary">开始录音</button>
      </template>
    </div>
    <div>
      <p>选择需要转换的配音师</p>
      <div class="speakers-container d-flex flex-row flex-wrap row-gap-1 column-gap-2">
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
        <SpeakerItem name="莫厚渊"></SpeakerItem>
      </div>
    </div>
    <button class="btn btn-primary" disabled>完成录音并上传完成后，可选择配音师转换</button>
  </div>
</template>

<style lang="scss" scoped></style>
