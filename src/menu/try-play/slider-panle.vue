<script setup lang="ts">
import { ElSlider, ElIcon } from 'element-plus'
import AnchorAvatar from './anchor-avatar.vue'
import { reactive, ref, type CSSProperties, computed } from 'vue'
import { formatTime } from '@/utils'
import { Star } from '@element-plus/icons-vue'
import { injectGlobalConfig } from '@/config'

interface Mark {
  style: CSSProperties
  label: string
}

type Marks = Record<number, Mark | string>

const config = injectGlobalConfig()

const timeMax = ref(10)
const time = ref(0)

const speedRange = ref([0, 2.0])
const speed = ref(0)

const pitchRange = ref([-10, 10])
const pitch = ref(0)

const timeMaxText = computed(() => formatTime(timeMax.value))
const timeText = computed(() => formatTime(time.value))

const speedMarks = reactive<Marks>(config.speed())

const pitchMarks = reactive<Marks>(config.pitch())
</script>

<template>
  <div class="slider-panle w-100 px-3 text-white" style="font-size: 0.5rem">
    <div class="mt-2 row text-center justify-content-between align-items-center">
      <div class="col-auto me-auto d-flex flex-row align-items-center">
        <img :src="config.demoAvatar()" class="rounded-circle" style="height: 50px" />
        <div class="ms-2 d-flex flex-column justify-content-between" style="height: 50px">
          <div class="d-flex dlex-row column-gap-2 align-items-end">
            <span class="fs-6">魔云猫</span>
            <span style="font-size: 0.5rem">0.55x</span>
          </div>
          <div class="d-flex flex-row column-gap-2 align-items-center">
            <ElIcon class="fs-6"><Star></Star></ElIcon>
            <span class="badge text-bg-primary px-2">24K</span>
          </div>
        </div>
      </div>
      <div class="col-7 d-flex flex-column align-items-end">
        <div>音频时长，请以生成后的为准</div>
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
      <div class="rounded-pill px-1 border">女青年(默认)</div>
      <div class="rounded-pill px-1">男孩儿</div>
      <div class="rounded-pill px-1">男青少年</div>
      <div class="rounded-pill px-1">男中年</div>
      <div class="rounded-pill px-1">男孩儿</div>
      <div class="rounded-pill px-1">男青少年</div>
      <div class="rounded-pill px-1">男中年</div>
      <div class="rounded-pill px-1">男孩儿</div>
      <div class="rounded-pill px-1">男孩儿</div>
      <div class="rounded-pill px-1">男中年</div>
      <div class="rounded-pill px-1">男青少年</div>
      <div class="rounded-pill px-1">男青少年</div>
      <div class="rounded-pill px-1">男中年</div>
    </div>
    <ul
      class="audio-mood mt-2 d-flex flex-row flex-wrap justify-content-start align-items-center row-gap-1 column-gap-2"
    >
      <li><AnchorAvatar></AnchorAvatar></li>
      <li><AnchorAvatar></AnchorAvatar></li>
      <li><AnchorAvatar></AnchorAvatar></li>
      <li><AnchorAvatar></AnchorAvatar></li>
      <li><AnchorAvatar></AnchorAvatar></li>
      <li><AnchorAvatar></AnchorAvatar></li>
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
        <li class="rounded-pill px-1 border">常用</li>
        <li class="rounded-pill px-1">已购</li>
        <li class="rounded-pill px-1">收藏</li>
        <li class="rounded-pill px-1">我的</li>
      </ul>
      <ul class="d-flex flex-row flex-wrap row-gap-2 column-gap-3 mb-3">
        <li><AnchorAvatar></AnchorAvatar></li>
        <li><AnchorAvatar></AnchorAvatar></li>
        <li><AnchorAvatar></AnchorAvatar></li>
        <li><AnchorAvatar></AnchorAvatar></li>
        <li><AnchorAvatar></AnchorAvatar></li>
        <li><AnchorAvatar></AnchorAvatar></li>
        <li><AnchorAvatar></AnchorAvatar></li>
        <li><AnchorAvatar></AnchorAvatar></li>
        <li><AnchorAvatar></AnchorAvatar></li>
        <li><AnchorAvatar></AnchorAvatar></li>
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
