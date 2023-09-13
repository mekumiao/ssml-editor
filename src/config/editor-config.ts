import type { FilterSpeaker, LabelValue } from '@/model'
import type { IEditorConfig } from '@wangeditor/editor'
import type { FilterBarSearch } from '@/components/bar-search'
import type { Speaker } from '@/model'
import { defaultAudioInfo, type AudioInfo } from '@/menu/conversion-menu/data'
import type { CancellationToken } from '@/utils'
import { defaultRecentUsageSpeaker, type RecentUsageSpeaker } from '@/menu/management-menu/data'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import mergeWith from 'lodash.mergewith'
import isArray from 'lodash.isarray'

type Effects = { zoom: boolean; grayscale: boolean }
type FetchFunction = () => Promise<LabelValue[]>
type WordFetchFunction = (word: string) => Promise<LabelValue[]>
type FilterFetchFunction = (filter: FilterBarSearch) => Promise<LabelValue[]>
type FilterSpeakerFetchFunction = (filter: FilterSpeaker) => Promise<Speaker[]>

type PartialKey = 'effects' | 'bgm' | 'special' | 'tryPlay' | 'conversion' | 'management'
type PartialProps<T, K extends keyof T> = { [P in K]?: Partial<T[P]> }

export type PartialSSMLEditorConfig = Partial<Omit<SSMLEditorConfig, PartialKey>> &
  PartialProps<SSMLEditorConfig, PartialKey>

export interface SSMLEditorConfig {
  effects: Effects
  editorConfig: Partial<IEditorConfig>
  handleError: (error: string, detail?: any) => void
  pinyin: { fetchData: WordFetchFunction }
  english: { fetchData: WordFetchFunction }
  bgm: {
    menus: LabelValue[]
    fetchScene: FetchFunction
    fetchStyle: FetchFunction
    fetchData: FilterFetchFunction
  }
  special: {
    menus: LabelValue[]
    fetchScene: FetchFunction
    fetchStyle: FetchFunction
    fetchData: FilterFetchFunction
  }
  tryPlay: {
    play: (ssml: string) => Promise<AudioInfo>
    gender: LabelValue[]
    topFlag: LabelValue[]
    category: LabelValue[]
    fetchData: FilterSpeakerFetchFunction
    featchTag: FetchFunction
    fetchStar: (speaker: string, star: boolean) => Promise<boolean>
  }
  conversion: {
    timeoutMilliseconds: number
    audioUpload: (file: File | Blob, token: CancellationToken) => Promise<AudioInfo>
    transfer: (opt: { audioId: string; speakerId: string }) => Promise<AudioInfo>
    fetchSpeaker: () => Promise<Speaker[]>
  }
  management: {
    recordRecentUsage: (recentUsage: RecentUsageSpeaker) => Promise<RecentUsageSpeaker>
    fetchRecentUsage: () => Promise<RecentUsageSpeaker[]>
    deleteRecentUsage: (id?: string) => Promise<void>
  }
}

function resolveList() {
  return () => Promise.resolve([])
}

function defaultSSMLEditorConfig(): SSMLEditorConfig {
  return {
    effects: { zoom: true, grayscale: true },
    editorConfig: { placeholder: '请输入内容...' },
    handleError: () => {},
    pinyin: { fetchData: resolveList() },
    english: { fetchData: resolveList() },
    bgm: {
      menus: [
        { label: '默认音效', value: '' },
        { label: '自定义音效', value: 'custom' },
        { label: '最近音效', value: 'history' },
      ],
      fetchScene: resolveList(),
      fetchStyle: resolveList(),
      fetchData: resolveList(),
    },
    special: {
      menus: [
        { label: '默认音效', value: '' },
        { label: '自定义音效', value: 'custom' },
        { label: '最近音效', value: 'history' },
      ],
      fetchScene: resolveList(),
      fetchStyle: resolveList(),
      fetchData: resolveList(),
    },
    conversion: {
      timeoutMilliseconds: 20000,
      audioUpload: () => Promise.resolve(defaultAudioInfo()),
      transfer: () => Promise.resolve(defaultAudioInfo()),
      fetchSpeaker: resolveList(),
    },
    management: {
      recordRecentUsage: () => Promise.resolve<RecentUsageSpeaker>(defaultRecentUsageSpeaker()),
      fetchRecentUsage: resolveList(),
      deleteRecentUsage: () => Promise.resolve(),
    },
    tryPlay: {
      play: () => Promise.resolve(defaultAudioInfo()),
      fetchData: resolveList(),
      featchTag: resolveList(),
      fetchStar: () => Promise.resolve(true),
      gender: [
        { label: '全部', value: '' },
        { label: '男声', value: 'Male' },
        { label: '女声', value: 'Female' },
      ],
      topFlag: [
        { label: '热榜', value: '' },
        { label: 'SVIP', value: 'SVIP' },
        { label: '付费', value: '付费' },
      ],
      category: [
        { label: '常用', value: '常用' },
        { label: '已购', value: '已购' },
        { label: '收藏', value: '收藏' },
        { label: '我的', value: '我的' },
      ],
    },
  }
}

function mergeSSMLEditorConfig(config?: Partial<SSMLEditorConfig>): SSMLEditorConfig {
  const defaultConfig = defaultSSMLEditorConfig()
  return mergeWith(defaultConfig, config, (objValue, srcValue) => {
    if (isArray(objValue) && isArray(srcValue)) return srcValue
  })
}

type CacheKey = 'editor-config'
const cache = {} as Record<CacheKey, unknown>

export function setConfig(config?: Partial<SSMLEditorConfig>) {
  const ssmlEditorConfig = mergeSSMLEditorConfig(config)
  emitter.on(EMITTER_EVENT.ERROR, ssmlEditorConfig.handleError)
  cache['editor-config'] = ssmlEditorConfig
}

export function getConfig() {
  const config = cache['editor-config']
  if (!config) throw new Error('SSMLEditorConfig is undefined')
  return config as SSMLEditorConfig
}
