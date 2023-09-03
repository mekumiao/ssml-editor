<script setup lang="ts">
import { defaultFilterSpeaker, type LabelValue, type Speaker } from '@/model'
import { ElInput, ElForm, ElTag, ElButton } from 'element-plus'
import { More } from '@element-plus/icons-vue'
import SelectList from './select-list.vue'
import { onMounted, ref, shallowRef } from 'vue'
import { speed, pitch } from './data'
import { useEditorStore, useManagementStore } from '@/stores'
import { type SubmitData, formatPitch, formatRate } from './data'
import { storeToRefs } from 'pinia'

const emit = defineEmits<{ submit: [data: SubmitData] }>()

const { globalEditConfig } = useEditorStore()
const { tryPlay } = globalEditConfig

const showMore = ref(false)
const searchInput = ref('')
const managementStore = useManagementStore()
const { contentData } = storeToRefs(managementStore)

const speakerCache = shallowRef<Speaker[]>([])
const dataListCategory = ref<LabelValue[]>([{ label: '全部类型', value: '' }, ...tryPlay.category])
const dataListSpeaker = ref<LabelValue[]>([])
const dataListRole = ref<LabelValue[]>([])
const dataListStyle = ref<LabelValue[]>([])

const dataListSpeed = ref<LabelValue[]>(speed())
const dataListPitch = ref<LabelValue[]>(pitch())

onMounted(async () => {
  contentData.value.category = dataListCategory.value[0].value
  await handleFetchData()
})

async function handleSelectCategory(category: string) {
  contentData.value.category = category
  await handleFetchData()
}

async function handleFetchData() {
  const speakers = await tryPlay.fetchData({ ...defaultFilterSpeaker(), ...contentData.value })
  speakerCache.value = speakers
  dataListSpeaker.value = speakers.map((v) => ({ label: v.displayName, value: v.name }))

  if (speakers.length > 0) {
    dataListRole.value = speakers[0].roles
    dataListStyle.value = speakers[0].styles
    contentData.value.name = speakers[0].name
  }
  if (dataListRole.value.length > 0) {
    contentData.value.role = dataListRole.value[0].value
  }
  if (dataListStyle.value.length > 0) {
    contentData.value.style = dataListStyle.value[0].value
  }
}

function handleSelectSpeaker(name: string) {
  const speader = speakerCache.value.find((v) => v.name === name)
  if (speader) {
    dataListRole.value = speader.roles
    dataListStyle.value = speader.styles

    if (dataListRole.value.length > 0) {
      contentData.value.role = dataListRole.value[0].value
    }
    if (dataListStyle.value.length > 0) {
      contentData.value.style = dataListStyle.value[0].value
    }
  }
}

function handleSubmit() {
  const speakerLabel =
    dataListSpeaker.value.find((v) => v.value === contentData.value.name)?.label || ''
  const roleLabel = dataListRole.value.find((v) => v.value === contentData.value.role)?.label || ''
  const styleLabel =
    dataListStyle.value.find((v) => v.value === contentData.value.style)?.label || ''
  const speedLabel =
    dataListSpeed.value.find((v) => v.value === contentData.value.speed)?.label || ''

  const data: SubmitData = {
    category: contentData.value.category,
    name: contentData.value.name,
    label: `${speakerLabel}|${roleLabel}|${styleLabel}|${speedLabel}`,
    value: contentData.value.name,
    role: contentData.value.role,
    style: contentData.value.style,
    speed: formatRate(Number(contentData.value.speed)),
    pitch: formatPitch(Number(contentData.value.pitch)),
  }
  emit('submit', data)
}
</script>

<template>
  <div style="width: 600px; height: 360px" class="position-relative px-2 pb-2">
    <ElForm @submit.prevent="handleFetchData">
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
          @update:modelValue="handleSelectCategory"
          v-model="contentData.category"
          :dataList="dataListCategory"
        >
          <span class="my-3">类型</span>
        </SelectList>
        <SelectList
          @update:modelValue="handleSelectSpeaker"
          v-model="contentData.name"
          :dataList="dataListSpeaker"
        >
          <span class="my-3">配音师</span>
        </SelectList>
        <SelectList v-model="contentData.role" :dataList="dataListRole">
          <span class="my-3">角色</span>
        </SelectList>
        <SelectList v-model="contentData.style" :dataList="dataListStyle">
          <span class="my-3">风格</span>
        </SelectList>
        <SelectList v-model="contentData.speed" :dataList="dataListSpeed">
          <span class="my-3">语速</span>
        </SelectList>
        <SelectList v-model="contentData.pitch" :dataList="dataListPitch">
          <span class="my-3">语调</span>
        </SelectList>
      </div>
    </div>

    <div class="position-absolute bottom-0 end-0 d-flex flex-row justify-content-end me-4 mb-3">
      <ElButton v-show="!showMore" @click="handleSubmit" type="primary">确定</ElButton>
      <ElButton v-show="showMore" type="primary">全部清空</ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
