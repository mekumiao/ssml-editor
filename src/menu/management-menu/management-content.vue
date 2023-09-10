<script setup lang="ts">
import { defaultFilterSpeaker, type LabelValue, type Speaker } from '@/model'
import { ElInput, ElForm, ElTag, ElButton } from 'element-plus'
import { More } from '@element-plus/icons-vue'
import SelectList from './select-list.vue'
import { computed, onMounted, ref, shallowRef, watch } from 'vue'
import { speed, pitch, type RecentUsageSpeaker, type ContentData } from './data'
import { type SubmitData, formatPitch, formatRate } from './data'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import { useElementVisibility } from '@vueuse/core'
import uniqBy from 'lodash.uniqby'
import { injectConfig } from '@/config'

const emit = defineEmits<{
  submit: [data: SubmitData]
  'update:contentData': [data: ContentData]
}>()
const props = defineProps<{ contentData: ContentData }>()

const ssmlEditorConfig = injectConfig()
const { tryPlay, management } = ssmlEditorConfig

const boxRef = ref<HTMLDivElement>()
const showMore = ref(false)
const searchInput = ref('')

const speakerCache = shallowRef<Speaker[]>([])
const recentUsageCache = ref<RecentUsageSpeaker[]>([])
const dataListCategory = ref<LabelValue[]>([{ label: '全部类型', value: '' }, ...tryPlay.category])
const dataListSpeaker = ref<LabelValue[]>([])
const dataListRole = ref<LabelValue[]>([])
const dataListStyle = ref<LabelValue[]>([])

const dataListSpeed = ref<LabelValue[]>(speed())
const dataListPitch = ref<LabelValue[]>(pitch())

const visible = useElementVisibility(boxRef)

const contentDataRef = computed(() => props.contentData)

onMounted(async () => {
  contentDataRef.value.category = dataListCategory.value[0].value
  await handleFetchData()
  await handleFetchRecentUsage()
})

watch(visible, (newValue) => {
  showMore.value = false

  if (newValue && searchInput.value) {
    searchInput.value = ''
    handleFetchData()
  }
})

async function handleSelectCategory(category: string) {
  contentDataRef.value.category = category
  await handleFetchData()
}

async function handleFetchData() {
  const speakers = await tryPlay.fetchData({
    ...defaultFilterSpeaker(),
    word: searchInput.value,
    category: props.contentData.category,
  })
  speakerCache.value = speakers
  dataListSpeaker.value = speakers.map((v) => ({ label: v.displayName, value: v.name }))

  if (speakers.length > 0) {
    dataListRole.value = speakers[0].roles
    dataListStyle.value = speakers[0].styles
    contentDataRef.value.name = speakers[0].name

    if (dataListRole.value.length > 0) {
      contentDataRef.value.role = dataListRole.value[0].value
    }
    if (dataListStyle.value.length > 0) {
      contentDataRef.value.style = dataListStyle.value[0].value
    }
  } else {
    dataListRole.value = []
    dataListStyle.value = []
    contentDataRef.value.role = ''
    contentDataRef.value.style = ''
  }
}

function handleSelectSpeaker(name: string) {
  const speader = speakerCache.value.find((v) => v.name === name)
  if (speader) {
    dataListRole.value = speader.roles
    dataListStyle.value = speader.styles

    if (dataListRole.value.length > 0) {
      contentDataRef.value.role = dataListRole.value[0].value
    }
    if (dataListStyle.value.length > 0) {
      contentDataRef.value.style = dataListStyle.value[0].value
    }
  }
}

async function handleSubmit(label?: string) {
  const speakerLabel =
    dataListSpeaker.value.find((v) => v.value === contentDataRef.value.name)?.label || '-'
  const roleLabel =
    dataListRole.value.find((v) => v.value === contentDataRef.value.role)?.label || '-'
  const styleLabel =
    dataListStyle.value.find((v) => v.value === contentDataRef.value.style)?.label || '-'

  const data: SubmitData = {
    category: contentDataRef.value.category,
    name: contentDataRef.value.name,
    label:
      label ??
      `${speakerLabel}|${roleLabel}|${styleLabel}|${contentDataRef.value.speed}|${contentDataRef.value.pitch}`,
    value: contentDataRef.value.name,
    role: contentDataRef.value.role,
    style: contentDataRef.value.style,
    speed: formatRate(Number(contentDataRef.value.speed)),
    pitch: formatPitch(Number(contentDataRef.value.pitch)),
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
    const record = { ...contentDataRef.value, label: data.label, id: '' }
    const result = await management.recordRecentUsage(record)
    recentUsageCache.value.splice(0, 0, result)
    recentUsageCache.value = uniqBy(
      recentUsageCache.value,
      (item) => `${item.name}+${item.role}+${item.style}+${item.speed}+${item.pitch}`,
    )
  } catch (error) {
    emitter.emit(EMITTER_EVENT.ERROR, `${error}`, error)
  }
}

function handleRecentUsageItemClick(item: RecentUsageSpeaker) {
  contentDataRef.value.category = item.category
  contentDataRef.value.name = item.name
  contentDataRef.value.pitch = item.pitch
  contentDataRef.value.role = item.role
  contentDataRef.value.speed = item.speed
  contentDataRef.value.style = item.style

  handleSubmit(item.label)
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
    <ElForm @submit.prevent="handleSelectCategory('')">
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
          v-model="contentDataRef.category"
          :dataList="dataListCategory"
        >
          <span class="my-3">类型</span>
        </SelectList>
        <SelectList
          @update:modelValue="handleSelectSpeaker"
          v-model="contentDataRef.name"
          :dataList="dataListSpeaker"
        >
          <span class="my-3">配音师</span>
        </SelectList>
        <SelectList v-model="contentDataRef.role" :dataList="dataListRole">
          <span class="my-3">角色</span>
        </SelectList>
        <SelectList v-model="contentDataRef.style" :dataList="dataListStyle">
          <span class="my-3">风格</span>
        </SelectList>
        <SelectList v-model="contentDataRef.speed" :dataList="dataListSpeed">
          <span class="my-3">语速</span>
        </SelectList>
        <SelectList v-model="contentDataRef.pitch" :dataList="dataListPitch">
          <span class="my-3">语调</span>
        </SelectList>
      </div>
    </div>

    <div class="position-absolute bottom-0 end-0 d-flex flex-row justify-content-end me-4 mb-3">
      <ElButton v-show="!showMore" @click="() => handleSubmit()" type="primary">确定</ElButton>
      <ElButton v-show="showMore" @click="handleRecentUsageClean" type="primary">全部清空</ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
