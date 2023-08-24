<script setup lang="ts">
import type { LabelValue } from '@/model'
import SpeakerItem from './speaker-item.vue'
import { ref, shallowRef } from 'vue'
// import { Recorder } from './recorder'

const inputFileRef = ref<HTMLElement>()

const audioFile = ref<{ name: string; path: string }>()
const isShowAudioUpload = ref(false)
const isRecord = ref(false)
const selectedFile = shallowRef()

// const recorder = shallowRef<Recorder>()

defineEmits<{ submit: [value: LabelValue] }>()
defineProps<{ text: string }>()

function handleInputFileChange(event: Event) {
  if (!event.target) return
  // @ts-ignore
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    console.log('已选择文件:', file.name)
  }
}

function handleInputAudioFile() {
  inputFileRef.value?.click()
}

function handleStartRecord() {}

function handleStoprecord() {}
</script>

<template>
  <div class="px-2 py-1" style="width: 410px">
    <section>
      <p class="text-start text-danger">请在安静的环境中进行录音，以需要转换的风格，读出以下文案</p>
      <div class="border border-secondary rounded w-100" style="height: 100px">{{ text }}</div>
    </section>
    <section class="mt-2" v-show="!isShowAudioUpload">
      <div class="w-100 d-flex flex-column row-gap-1">
        <input
          accept="audio/*"
          ref="inputFileRef"
          @change="handleInputFileChange"
          type="file"
          hidden
        />
        <button class="btn btn-success">实时录音</button>
        <button @click="handleInputAudioFile" class="btn btn-primary">上传录音</button>
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
            <button @click="handleStartRecord" class="btn btn-primary">开始录音</button>
            <button @click="handleStoprecord" class="btn btn-primary">结束录音</button>
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
