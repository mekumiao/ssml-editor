<script setup lang="ts">
import type { LabelValue } from '@/model'
import { ElInput, ElForm, ElTag, ElButton } from 'element-plus'
import { More } from '@element-plus/icons-vue'
import SelectList from './select-list.vue'
import { ref } from 'vue'
import { speed, pitch } from './data'

const showMore = ref(false)

const searchInput = ref('')

const selTypeRef = ref()
const selSpeakerRef = ref()
const selRoleRef = ref()
const selStyleRef = ref()
const selSpeedRef = ref()
const selPitchRef = ref()

const selType = ref('')
const selSpeaker = ref('')
const selRole = ref('')
const selStyle = ref('')
const selSpeed = ref('')
const selPitch = ref('')

const dataListType = ref<LabelValue[]>([])
const dataListSpeaker = ref<LabelValue[]>([])
const dataListRole = ref<LabelValue[]>([])
const dataListStyle = ref<LabelValue[]>([])

const dataListSpeed = ref<LabelValue[]>(speed())
const dataListPitch = ref<LabelValue[]>(pitch())

dataListType.value = [
  { label: '全部类型', value: '' },
  { label: '常规', value: '2' },
  { label: '已购', value: '3' },
  { label: '收藏', value: '4' },
  { label: '我的', value: '5' },
  { label: 'SVIP', value: '6' },
  { label: '付费', value: '7' },
]

dataListSpeaker.value = dataListType.value
dataListRole.value = dataListType.value
dataListStyle.value = dataListType.value

function handleSearch() {}
function handleSelectType() {}
function handleSelectSpeaker() {
  selRole.value = ''
}
function handleSelectRole() {
  selStyle.value = ''
}
function handleSelectStyle() {
  selSpeed.value = '1.00'
  selPitch.value = '0'
}
function handleSelectSpeed() {}
function handleSelectPitch() {}
</script>

<template>
  <div style="width: 600px; height: 360px" class="position-relative px-2 pb-2">
    <ElForm @submit.prevent="handleSearch">
      <ElInput v-model="searchInput" placeholder="请输入名称快速查找配音师"></ElInput>
    </ElForm>
    <div class="position-relative">
      <div class="position-absolute top-0 end-0">
        <ElButton size="small" :icon="More" @click="() => (showMore = !showMore)"></ElButton>
      </div>
      <ul
        class="d-flex flex-row row-gap-1 column-gap-2 overflow-x-hidden"
        :class="{ 'flex-wrap': showMore }"
      >
        <li><span class="text-nowrap">近期使用:</span></li>
        <li><ElTag type="info" closable>魔小婉|女青年|娱乐|1x</ElTag></li>
        <li><ElTag type="info" closable>魔小婉|女青年|娱乐|1x</ElTag></li>
        <li><ElTag type="info" closable>魔小婉|女青年|娱乐|1x</ElTag></li>
        <li><ElTag type="info" closable>魔小婉|女青年|娱乐|1x</ElTag></li>
        <li><ElTag type="info" closable>魔小婉|女青年|娱乐|1x</ElTag></li>
        <li><ElTag type="info" closable>魔小婉|女青年|娱乐|1x</ElTag></li>
        <li><ElTag type="info" closable>魔小婉|女青年|娱乐|1x</ElTag></li>
      </ul>
      <div v-show="!showMore" :class="{ 'd-flex flex-row': !showMore }">
        <SelectList
          @update:modelValue="handleSelectType"
          ref="selTypeRef"
          v-model="selType"
          :dataList="dataListType"
        >
          <span class="my-3">类型</span>
        </SelectList>
        <SelectList
          @update:modelValue="handleSelectSpeaker"
          ref="selSpeakerRef"
          v-model="selSpeaker"
          :dataList="dataListSpeaker"
        >
          <span class="my-3">配音师</span>
        </SelectList>
        <SelectList
          @update:modelValue="handleSelectRole"
          ref="selRoleRef"
          v-model="selRole"
          :dataList="dataListRole"
        >
          <span class="my-3">角色</span>
        </SelectList>
        <SelectList
          @update:modelValue="handleSelectStyle"
          ref="selStyleRef"
          v-model="selStyle"
          :dataList="dataListStyle"
        >
          <span class="my-3">风格</span>
        </SelectList>
        <SelectList
          @update:modelValue="handleSelectSpeed"
          ref="selSpeedRef"
          v-model="selSpeed"
          :dataList="dataListSpeed"
        >
          <span class="my-3">语速</span>
        </SelectList>
        <SelectList
          @update:modelValue="handleSelectPitch"
          ref="selPitchRef"
          v-model="selPitch"
          :dataList="dataListPitch"
        >
          <span class="my-3">语调</span>
        </SelectList>
      </div>
    </div>

    <div class="position-absolute bottom-0 end-0 d-flex flex-row justify-content-end me-4 mb-3">
      <ElButton v-show="!showMore" type="primary">确定</ElButton>
      <ElButton v-show="showMore" type="primary">全部清空</ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
