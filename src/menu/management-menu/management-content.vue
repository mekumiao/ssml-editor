<script setup lang="ts">
import { defaultFilterSpeaker, type LabelValue, type Speaker } from '@/model'
import { ElInput, ElForm, ElTag, ElButton } from 'element-plus'
import { More } from '@element-plus/icons-vue'
import SelectList from './select-list.vue'
import { onMounted, ref, shallowRef, watch } from 'vue'
import { speed, pitch, type RecentUsageSpeaker } from './data'
import { useManagementStore } from '@/stores'
import { type SubmitData, formatPitch, formatRate } from './data'
import { storeToRefs } from 'pinia'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import { useElementVisibility } from '@vueuse/core'
import sortedUniqBy from 'lodash.sorteduniqby'
import { injectConfig } from '@/config'

const emit = defineEmits<{ submit: [data: SubmitData] }>()

const globalEditConfig = injectConfig()
const { tryPlay, management } = globalEditConfig

const boxRef = ref<HTMLDivElement>()
const showMore = ref(false)
const searchInput = ref('')
const managementStore = useManagementStore()
const { contentData } = storeToRefs(managementStore)

const speakerCache = shallowRef<Speaker[]>([])
const recentUsageCache = ref<RecentUsageSpeaker[]>([])
const dataListCategory = ref<LabelValue[]>([{ label: '全部类型', value: '' }, ...tryPlay.category])
const dataListSpeaker = ref<LabelValue[]>([])
const dataListRole = ref<LabelValue[]>([])
const dataListStyle = ref<LabelValue[]>([])

const dataListSpeed = ref<LabelValue[]>(speed())
const dataListPitch = ref<LabelValue[]>(pitch())

const visible = useElementVisibility(boxRef)

onMounted(async () => {
  contentData.value.category = dataListCategory.value[0].value
  await handleFetchData()
  await handleFetchRecentUsage()
})

watch(visible, (newValue) => {
  if (!newValue) {
    searchInput.value = ''
    showMore.value = false
  }
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

async function handleSubmit() {
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
  await handleRecordRecentUsage(data)
}

async function handleFetchRecentUsage() {
  try {
    recentUsageCache.value = await management.fetchRecentUsage()
  } catch (error) {
    emitter.emit(EMITTER_EVENT.ERROR, `${error}`, error)
  }
}

async function handleRecordRecentUsage(data: SubmitData) {
  try {
    const record = { ...contentData.value, label: data.label, id: '' }
    const result = await management.recordRecentUsage(record)
    recentUsageCache.value.splice(0, 0, result)
    recentUsageCache.value = sortedUniqBy(
      recentUsageCache.value,
      (item) => `${item.name}+${item.role}+${item.style}+${item.pitch}+${item.speed}`,
    )
  } catch (error) {
    emitter.emit(EMITTER_EVENT.ERROR, `${error}`, error)
  }
}

function handleRecentUsageItemClick(item: RecentUsageSpeaker) {
  contentData.value.category = item.category
  contentData.value.name = item.name
  contentData.value.pitch = item.pitch
  contentData.value.role = item.role
  contentData.value.speed = item.speed
  contentData.value.style = item.style

  handleSubmit()
}

async function handleRecentUsageClose(index: number) {
  try {
    const item = recentUsageCache.value[index]
    await management.deleteRecentUsage(item.id)
    recentUsageCache.value.splice(index, 1)
  } catch (error) {
    emitter.emit(EMITTER_EVENT.ERROR, `${error}`, error)
  }
}

async function handleRecentUsageClean() {
  try {
    await management.deleteRecentUsage()
    recentUsageCache.value = []
  } catch (error) {
    emitter.emit(EMITTER_EVENT.ERROR, `${error}`, error)
  }
}
</script>

<template>
  <div ref="boxRef" style="width: 600px; height: 360px" class="position-relative px-2 pb-2">
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
        <li
          class="btn m-0 p-0"
          v-for="(item, index) in recentUsageCache"
          @click="handleRecentUsageItemClick(item)"
          :key="index"
        >
          <ElTag type="info" @close="handleRecentUsageClose(index)" closable>
            {{ item.label }}
          </ElTag>
        </li>
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
      <ElButton v-show="showMore" @click="handleRecentUsageClean" type="primary">全部清空</ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
