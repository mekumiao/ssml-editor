<script setup lang="ts">
import type { LabelValue, Speaker } from '@/model'
import SpeakerItem from './speaker-item.vue'
import { onMounted, ref, shallowRef, watch } from 'vue'
import { Recorder } from './recorder'
import { CancellationTokenSource, FileSelector, Timer } from '@/utils'
import { emitter } from '@/event-bus'
import { type AudioInfo } from './data'
import { useElementVisibility } from '@vueuse/core'
import { AudioPlayer } from './audio-player'
import { getConfig } from '@/config'

const emit = defineEmits<{ submit: [value: LabelValue] }>()
const props = defineProps<{ reopen: VoidFunction }>()

const ssmlEditorConfig = getConfig()
const { audioUpload, transfer, fetchSpeaker, timeoutMilliseconds } = ssmlEditorConfig.conversion

const boxRef = ref<HTMLElement>()

const audioInfo = ref<AudioInfo>()
const transferAudioInfo = ref<AudioInfo>()
const isRecord = ref<boolean>(true)
const speakerList = ref<Speaker[]>([])
const selSpeaker = ref<Speaker>()

const recordFile = shallowRef<Blob>()
const inputFile = shallowRef<File>()
const audioPlayer = new AudioPlayer()
const { playState } = audioPlayer

let cts: CancellationTokenSource | undefined
const audioRecorder = new Recorder()
const audioSelector = new FileSelector('audio/*')
const recordTimer = new Timer(60)
const { state: recordTimerState } = recordTimer

const { recorderState } = audioRecorder

const visible = useElementVisibility(boxRef)

watch(visible, (newValue) => {
  if (!newValue) {
    reset()
  }
})

onMounted(async () => {
  speakerList.value = await fetchSpeaker()
})

watch(visible, (newVlaue) => {
  if (!newVlaue) {
    isRecord.value = true
    cts?.cancel()
  }
})

defineExpose({
  openInputFile,
})

function reset() {
  isRecord.value = true

  handleDeleteFile()
}

function handleDeleteFile() {
  audioPlayer.pause()

  audioInfo.value = undefined
  transferAudioInfo.value = undefined
  selSpeaker.value = undefined
  recordFile.value = undefined
  inputFile.value = undefined

  cts?.cancel()
}

function handleStopRecord() {
  audioRecorder.stop()
  recordTimer.stop()
}

async function handleStartRecord() {
  cts = new CancellationTokenSource(60000)
  recordTimer.start()
  try {
    cts.startTimeout()
    recordFile.value = await audioRecorder.start(cts.token)
  } catch (error) {
    emitter.emit('error', `${error}`, error)
  } finally {
    cts.cancel()
    recordTimer.stop()
  }
}

function handlePlay() {
  if (playState.value === 'playing') {
    audioPlayer.pause()
  } else if (recordFile.value) {
    const audioURL = window.URL.createObjectURL(recordFile.value)
    audioPlayer.load(audioURL)
    audioPlayer.play()
  } else if (inputFile.value) {
    const audioURL = window.URL.createObjectURL(inputFile.value)
    audioPlayer.load(audioURL)
    audioPlayer.play()
  }
}

async function openInputFile() {
  try {
    inputFile.value = await audioSelector.open()
    isRecord.value = false
    return true
  } catch (error) {
    return false
  }
}

async function handleAudioUpload() {
  try {
    cts = new CancellationTokenSource(timeoutMilliseconds)
    if (isRecord.value && recordFile.value) {
      cts.startTimeout()
      audioInfo.value = await audioUpload(recordFile.value, cts.token)
    } else if (!isRecord.value && inputFile.value) {
      cts.startTimeout()
      audioInfo.value = await audioUpload(inputFile.value, cts.token)
    } else {
      throw new Error('请选则文件或实时录音')
    }
  } catch (error) {
    emitter.emit('error', `${error}`, error)
  }
}

async function handleSpeakerItemClick(item: Speaker) {
  try {
    if (audioInfo.value) {
      selSpeaker.value = item
      transferAudioInfo.value = await transfer({ audioId: audioInfo.value.id, speakerId: item.id })
    } else {
      emitter.emit('error', '请先上传音频文件')
    }
  } catch (error) {
    emitter.emit('error', `${error}`, error)
  }
}

function handleSubmit() {
  if (transferAudioInfo.value && selSpeaker.value) {
    emit('submit', { label: selSpeaker.value.displayName, value: transferAudioInfo.value.src })
    reset()
  }
}

function handleReupload() {
  cts?.cancel()
  props.reopen()
}
</script>

<template>
  <div class="audio-upload" ref="boxRef">
    <div
      class="d-flex flex-row justify-content-between border rounded-pill border-secondary my-3 py-1 px-2"
    >
      <div class="text-secondary d-flex flex-row align-items-center" style="font-size: 0.5rem">
        <button @click="handlePlay" v-if="recordFile || inputFile" class="btn btn-sm rounded-pill">
          <span
            v-if="playState === 'playing' || recorderState === 'recording'"
            class="iconfont icon-pause"
          ></span>
          <span v-else class="iconfont icon-play"></span>
        </button>
        <span>{{ inputFile?.name || recordFile?.name }}</span>
      </div>
      <div>
        <button
          v-if="!audioInfo && (recordFile || inputFile)"
          @click="handleDeleteFile"
          class="btn btn-sm rounded-pill"
        >
          <span class="iconfont icon-delete"></span>
        </button>
        <span v-if="audioInfo" style="font-size: 0.5rem">已上传</span>
        <template v-if="isRecord && !recordFile">
          <button
            v-if="recorderState === 'recording'"
            @click="handleStopRecord"
            class="btn btn-primary btn-sm rounded-pill"
          >
            结束录音({{ recordTimerState }})s
          </button>
          <button v-else @click="handleStartRecord" class="btn btn-primary btn-sm rounded-pill">
            开始录音
          </button>
        </template>
        <button
          v-if="!isRecord && !inputFile"
          @click="openInputFile"
          class="btn btn-primary btn-sm rounded-pill"
        >
          选择文件
        </button>
        <button
          v-if="audioInfo"
          @click="handleReupload"
          class="btn btn-primary btn-sm rounded-pill"
        >
          重传音频
        </button>
        <button
          v-if="!audioInfo && (inputFile || recordFile)"
          @click="handleAudioUpload"
          class="btn btn-primary btn-sm rounded-pill"
        >
          上传音频
        </button>
      </div>
    </div>
    <div>
      <p>选择需要转换的配音师</p>
      <div
        class="speakers-container border rounded d-flex flex-row flex-wrap row-gap-1 column-gap-2 overflow-y-auto overflow-x-hidden scrollbar"
        style="height: 150px"
      >
        <SpeakerItem
          @click="handleSpeakerItemClick(item)"
          v-for="(item, index) in speakerList"
          :key="index"
          :label="item.displayName"
          :avatar="item.avatar"
          :activated="item.name === selSpeaker?.name"
        ></SpeakerItem>
      </div>
    </div>
    <button class="btn btn-primary mt-1" @click="handleSubmit" :disabled="!transferAudioInfo">
      完成录音并上传完成后，可选择配音师转换
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
