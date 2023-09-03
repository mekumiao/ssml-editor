<script setup lang="ts">
import { ElSlider, ElIcon } from 'element-plus'
import AnchorAvatar from './anchor-avatar.vue'
import { reactive, ref, type CSSProperties, computed, watch, onMounted, toRaw } from 'vue'
import { formatTime } from '@/utils'
import { Star, StarFilled } from '@element-plus/icons-vue'
import { demoAvatar, speed as speedGetter, pitch as pitchGetter } from '@/config'
import StyleAvatar from './style-avatar.vue'
import { formatPitch, formatRate } from './data'
import { useEditorStore, useSSMLStore, useTryPlayStore } from '@/stores'
import { defaultFilterSpeaker, type Speaker } from '@/model'
import { emitter } from '@/event-bus'
import { EMITTER_EVENT } from '@/constant'

interface Mark {
  style: CSSProperties
  label: string
}

type Marks = Record<number, Mark | string>

const { globalEditConfig } = useEditorStore()
const { rootProsody, rootExpressAs } = useSSMLStore()
const { fetchStar, category, fetchData } = globalEditConfig.tryPlay
const tryPlayStore = useTryPlayStore()

const isStar = ref(tryPlayStore.speaker.isStar)
const timeMax = ref(10)
const time = ref(0)

const speedRange = ref([0, 2.0])
const speed = ref(1)

const pitchRange = ref([-10, 10])
const pitch = ref(0)

const timeMaxText = computed(() => formatTime(timeMax.value))
const timeText = computed(() => formatTime(time.value))

const speedMarks = reactive<Marks>(speedGetter())
const pitchMarks = reactive<Marks>(pitchGetter())

const flag = ref('')
const speakerList = ref<Speaker[]>([])

onMounted(async () => {
  await handleCategoryClick(category[0].value)
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
    rootProsody.pitch = formatPitch(value)
  },
  { immediate: true },
)

watch(
  speed,
  (value) => {
    rootProsody.rate = formatRate(value)
  },
  { immediate: true },
)

async function handleStar() {
  isStar.value = await fetchStar(tryPlayStore.speaker.name, !isStar.value)
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
    emitter.emit(EMITTER_EVENT.ERROR, `${error}`, error)
  }
}

function handleSpeakerClick(value: Speaker) {
  tryPlayStore.setSpeaker(toRaw(value))
}
</script>

<template>
  <div class="slider-panle w-100 px-3 text-white" style="font-size: 0.5rem">
    <div class="mt-2 d-flex text-center justify-content-between align-items-center">
      <div class="me-auto d-flex flex-row align-items-center">
        <img :src="demoAvatar()" class="rounded-circle" style="height: 50px" />
        <div class="ms-2 d-flex flex-column justify-content-between" style="height: 50px">
          <div class="d-flex dlex-row column-gap-2 align-items-end">
            <span class="fs-6">{{ tryPlayStore.speaker.displayName }}</span>
            <span style="font-size: 0.5rem">{{ speed }}x</span>
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
        <ElSlider :max="timeMax" v-model="time" size="small"></ElSlider>
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
      class="audio-mood mt-2 d-flex flex-row flex-wrap justify-content-start align-items-center row-gap-1 column-gap-2"
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
      <span class="border rounded-pill p-1">配音师详情</span>
    </div>
    <div class="slider-box">
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
    <div class="slider-box">
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
          <AnchorAvatar
            :activate="item.name === tryPlayStore.speaker.name"
            :data="{ ...item, label: item.displayName, value: item.name }"
          ></AnchorAvatar>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
ol,
ul {
  padding: 0;
  margin: 0;
}

.slider-box {
  height: 75px;
}
</style>
