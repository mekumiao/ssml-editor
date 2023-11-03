<script setup lang="ts">
import { ElSlider, ElIcon } from 'element-plus'
import SpeakerAvatar from './speaker-avatar.vue'
import PlayButton from './play-button.vue'
import type { CSSProperties } from 'vue'
import { reactive, ref, onUnmounted, computed, watch, onMounted, toRaw, inject } from 'vue'
import { formatTime } from '@/utils'
import { Star, StarFilled } from '@element-plus/icons-vue'
import { getConfig } from '@/config'
import StyleAvatar from './style-avatar.vue'
import { defaultSpeed, defaultPitch } from './data'
import { useSSMLStore, useTryPlayStore } from '@/stores'
import { defaultFilterSpeaker, type Speaker } from '@/model'
import { emitter } from '@/event-bus'
import type { Arrayable } from 'element-plus/lib/utils/typescript'

interface Mark {
  style: CSSProperties
  label: string
}

type Marks = Record<number, Mark | string>

const editorKey = inject<symbol>('editorKey')!
const ssmlEditorConfig = getConfig(editorKey)
const { rootProsody, rootExpressAs } = useSSMLStore()
const { category, fetchData } = ssmlEditorConfig.tryPlay
const tryPlayStore = useTryPlayStore()

const timeMax = tryPlayStore.audioPlayer.duration
const currentTime = tryPlayStore.audioPlayer.currentTime
const time = ref(0)
const isInput = ref(false)

const speedRange = ref([0, 2.0])
const speed = ref(1)

const pitchRange = ref([-10, 10])
const pitch = ref(0)

const timeMaxText = computed(() => formatTime(timeMax.value))
const timeText = computed(() => formatTime(time.value))
const isStar = computed(() => tryPlayStore.speaker.isStar)

const speedMarks = reactive<Marks>(defaultSpeed())
const pitchMarks = reactive<Marks>(defaultPitch())

const flag = ref('')
const speakerList = ref<Speaker[]>([])

onMounted(async () => {
  await handleCategoryClick(category[0].value)
})

onMounted(() => {
  emitter.on('tryplay-speaker-update-star', handleUpdateStarTheCache)
})

onUnmounted(() => {
  emitter.off('tryplay-speaker-update-star', handleUpdateStarTheCache)
})

watch(
  () => tryPlayStore.speaker,
  (newValue) => {
    newValue.roles.length > 0 && handleRoleClick(newValue.roles[0].value)
    newValue.styles.length > 0 && handleStyleClick(newValue.styles[0].value)
  },
  { immediate: true },
)

watch(
  pitch,
  (value) => {
    rootProsody.pitch = value.toString()
  },
  { immediate: true },
)

watch(
  speed,
  (value) => {
    rootProsody.rate = value.toString()
  },
  { immediate: true },
)

watch(currentTime, (newValue) => {
  if (!isInput.value) time.value = newValue
})

async function handleStar() {
  await tryPlayStore.star(editorKey, !isStar.value)
}

function handleUpdateStarTheCache(speakerId: string, isStar: boolean) {
  const speakerCache = speakerList.value.find((v) => v.id === speakerId)
  if (speakerCache) speakerCache.isStar = isStar
}

function handleRoleClick(value: string) {
  rootExpressAs.role = value
}

function handleStyleClick(value: string) {
  rootExpressAs.style = value
}

async function handleCategoryClick(value: string) {
  flag.value = value
  try {
    speakerList.value = await fetchData({ ...defaultFilterSpeaker(), category: value })
  } catch (error) {
    emitter.emit('error', error)
  }
}

function handleSpeakerClick(value: Speaker) {
  tryPlayStore.setSpeaker(editorKey, toRaw(value))
}

function handleTimeInput() {
  isInput.value = true
}

function handleTimeChange(time: Arrayable<number>) {
  if (!(time instanceof Array)) {
    currentTime.value = time
    tryPlayStore.audioPlayer.play()
  }
  isInput.value = false
}

function handleSpeakerDetailShow() {
  emitter.emit('tryplay-speaker-detail-show', tryPlayStore.speaker)
}
</script>

<template>
  <div class="right-panle w-100 px-3 text-white" style="font-size: 0.65rem">
    <div class="mt-2 d-flex text-center justify-content-between align-items-center">
      <div class="me-auto d-flex flex-row align-items-center">
        <PlayButton></PlayButton>
        <div class="ms-2 d-flex flex-column justify-content-between" style="height: 50px">
          <div class="d-flex dlex-row column-gap-2 align-items-end">
            <span class="fs-6">{{ tryPlayStore.speaker.displayName }}</span>
            <span>{{ speed }}x</span>
          </div>
          <div class="d-flex flex-row column-gap-2 align-items-center">
            <ElIcon @click="handleStar" class="fs-6" :style="{ color: isStar ? 'red' : 'white' }">
              <StarFilled v-if="isStar"></StarFilled>
              <Star v-else></Star>
            </ElIcon>
            <span v-if="tryPlayStore.speaker.isSupper24K" class="badge text-bg-primary px-2">
              24K
            </span>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column align-items-end">
        <div class="text-info">音频时长，请以生成后的为准</div>
        <div class="mt-1">
          <span>{{ timeText }}</span>
          <span>/</span>
          <span>{{ timeMaxText }}</span>
        </div>
        <ElSlider
          :max="timeMax"
          v-model="time"
          size="small"
          @input="handleTimeInput"
          @change="handleTimeChange"
          :format-tooltip="formatTime"
        ></ElSlider>
      </div>
    </div>
    <div
      class="role-list mt-2 d-flex flex-row flex-wrap justify-content-start align-items-center row-gap-2 column-gap-3"
    >
      <div
        @click="handleRoleClick(item.value)"
        v-for="(item, index) in tryPlayStore.speaker.roles"
        :key="index"
        class="rounded-pill px-1"
        :class="{ border: item.value === (rootExpressAs.role || '') }"
      >
        {{ item.label }}
      </div>
    </div>
    <ul
      class="mt-2 d-flex flex-row flex-wrap justify-content-start align-items-center row-gap-1 column-gap-2"
    >
      <li
        class="mx-2"
        @click="handleStyleClick(item.value)"
        v-for="(item, index) in tryPlayStore.speaker.styles"
        :key="index"
      >
        <StyleAvatar
          :activate="item.value === (rootExpressAs.style || '')"
          :data="item"
        ></StyleAvatar>
      </li>
    </ul>
    <div class="my-3">
      <span @click="handleSpeakerDetailShow" class="border rounded-pill p-1">配音师详情</span>
    </div>
    <div class="right-box">
      <div>
        <span>语速：{{ speed }}x</span>
      </div>
      <ElSlider
        v-model="speed"
        :min="speedRange[0]"
        :max="speedRange[1]"
        :step="0.05"
        :marks="speedMarks"
      ></ElSlider>
    </div>
    <div class="right-box">
      <div>
        <span>语调：{{ pitch }}</span>
      </div>
      <ElSlider
        v-model="pitch"
        :min="pitchRange[0]"
        :max="pitchRange[1]"
        :step="0.2"
        :marks="pitchMarks"
      ></ElSlider>
    </div>
    <div>
      <ul class="d-flex flex-row gap-3 my-3">
        <li
          @click="handleCategoryClick(item.value)"
          v-for="(item, index) in category"
          :key="index"
          class="rounded-pill px-1"
          :class="{ border: item.value === flag }"
        >
          {{ item.label }}
        </li>
      </ul>
      <ul class="d-flex flex-row flex-wrap row-gap-2 column-gap-3 mb-3" style="min-height: 100px">
        <li @click="handleSpeakerClick(item)" v-for="(item, index) in speakerList" :key="index">
          <SpeakerAvatar
            :activate="item.name === tryPlayStore.speaker.name"
            :data="{
              label: item.displayName,
              value: item.name,
              avatar: item.avatar,
              isFree: item.isFree,
            }"
          ></SpeakerAvatar>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right-box {
  height: 75px;
}
</style>
