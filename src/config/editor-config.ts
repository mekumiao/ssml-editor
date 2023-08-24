import type { Filter, LabelValue } from '@/model'
import { speed, pitch, demoAvatar } from './data'
import { inject } from 'vue'
import { PROVIDER_KEY } from '@/constant'

type FetahFunction = (word: string) => Promise<LabelValue[]>
type FilterFetahFunction = (filter: Filter) => Promise<LabelValue[]>

function resolveList<T>() {
  return () => Promise.resolve<T[]>([])
}

export type GlobalEditorConfig = ReturnType<typeof createGlobalEditorConfig>

export interface SSMLEditorConfig {
  handleError: (error: string) => void
  fetchSpeaker: FetahFunction
  fetchEnglish: FetahFunction
  fetchBgm: FilterFetahFunction
  fetchSpecial: FilterFetahFunction
}

export function createGlobalEditorConfig(config?: SSMLEditorConfig) {
  const handleError = config?.handleError || (() => {})
  const fetchSpeaker = config?.fetchSpeaker || resolveList<LabelValue>()
  const fetchEnglish = config?.fetchSpeaker || resolveList<LabelValue>()
  const fetchBgm: FilterFetahFunction = config?.fetchBgm || resolveList<LabelValue>()
  const fetchSpecial: FilterFetahFunction = config?.fetchSpecial || resolveList<LabelValue>()

  return {
    handleError,
    fetchSpeaker,
    fetchEnglish,
    fetchBgm,
    fetchSpecial,
    speed,
    pitch,
    demoAvatar
  }
}

export function provideGlobalConfig(
  provide: (key: string, config: GlobalEditorConfig) => void,
  config?: SSMLEditorConfig
) {
  const globalConfig = createGlobalEditorConfig(config)
  provide(PROVIDER_KEY.EDITORCONFIG, globalConfig)
  return globalConfig
}

/**
 * 必须在setup函数中调用
 */
export function injectGlobalConfig() {
  const config = inject<GlobalEditorConfig>(PROVIDER_KEY.EDITORCONFIG)
  if (config) return config
  throw Error('请注入GlobalEditorConfig')
}
