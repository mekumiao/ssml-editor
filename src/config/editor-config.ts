import type { Filter, LabelValue } from '@/model'
import { speed, pitch, demoAvatar } from './data'
import type { IEditorConfig } from '@wangeditor/editor'

type FetahFunction = (word: string) => Promise<LabelValue[]>
type FilterFetahFunction = (filter: Filter) => Promise<LabelValue[]>

function resolveList<T>() {
  return () => Promise.resolve<T[]>([])
}

export type GlobalEditorConfig = ReturnType<typeof createGlobalEditorConfig>

export interface SSMLEditorConfig {
  editorConfig?: IEditorConfig
  handleError: (error: string) => void
  fetchSpeaker: FetahFunction
  fetchEnglish: FetahFunction
  fetchBgm: FilterFetahFunction
  fetchSpecial: FilterFetahFunction
}

export function createGlobalEditorConfig(config?: SSMLEditorConfig) {
  const editorConfig =
    config?.editorConfig || ({ maxLength: 5000, placeholder: '请输入内容...' } as IEditorConfig)
  const handleError = config?.handleError || (() => {})
  const fetchSpeaker = config?.fetchSpeaker || resolveList<LabelValue>()
  const fetchEnglish = config?.fetchSpeaker || resolveList<LabelValue>()
  const fetchBgm: FilterFetahFunction = config?.fetchBgm || resolveList<LabelValue>()
  const fetchSpecial: FilterFetahFunction = config?.fetchSpecial || resolveList<LabelValue>()

  return {
    editorConfig,
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
