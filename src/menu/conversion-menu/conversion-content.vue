<script setup lang="ts">
import type { LabelValue } from '@/model'
import SpeakerItem from './speaker-item.vue'
import { ref, shallowRef, watch } from 'vue'
import { Recorder } from './recorder'
import { FileSelector } from '@/utils'
import { useElementVisibility } from '@vueuse/core'
// import { useEditorStore } from '@/stores'

defineEmits<{ submit: [value: LabelValue] }>()
defineProps<{ text: string }>()

const boxRef = ref<HTMLElement>()

// const { globalEditConfig } = useEditorStore()

const audioFile = ref<{ name: string; path: string }>()
const isShowAudioUpload = ref(false)
const isRecord = ref(false)

const recordingFile = shallowRef<Blob>()
const localFile = shallowRef<File>()

const audioRecorder = new Recorder()
const audioSelector = new FileSelector('audio-conversion', 'audio/*')

const visible = useElementVisibility(boxRef)

watch(visible, (newVlaue) => {
  if (!newVlaue) {
    isRecord.value = false
    isShowAudioUpload.value = false
  }
})

async function handleOpenRecording() {
  isShowAudioUpload.value = true
  isRecord.value = true
  try {
    recordingFile.value = await audioRecorder.open()
  } catch (error) {
    //
  }
}

async function handleOpenInputFile() {
  isShowAudioUpload.value = true
  isRecord.value = false
  try {
    localFile.value = await audioSelector.open()
    console.log(localFile.value)
  } catch (error) {
    //
  }
}
</script>

<template>
  <div ref="boxRef" class="px-2 py-1" style="width: 410px">
    <section>
      <p class="text-start text-danger">请在安静的环境中进行录音，以需要转换的风格，读出以下文案</p>
      <div class="border border-secondary rounded w-100" style="height: 100px">{{ text }}</div>
    </section>
    <section class="mt-2" v-show="!isShowAudioUpload">
      <div class="w-100 d-flex flex-column row-gap-1">
        <button @click="handleOpenRecording" class="btn btn-success">实时录音</button>
        <button @click="handleOpenInputFile" class="btn btn-primary">上传录音</button>
      </div>
      <p class="mt-2 text-secondary" style="font-size: 0.5rem">
        录音内容需要和滑选一致，音频限制60秒，滑选文案限制60个字
      </p>
    </section>
    <section v-show="isShowAudioUpload">
      <div class="audio-upload">
        <div class="border rounded-pill border-secondary d-flex flex-row justify-content-between">
          <template v-if="isRecord">
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
            <button @click="audioRecorder.stop" class="btn btn-primary">结束录音</button>
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
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
