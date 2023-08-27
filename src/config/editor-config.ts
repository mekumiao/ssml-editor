import type { LabelValue } from '@/model'
import { speed, pitch, demoAvatar } from './data'
import type { IEditorConfig } from '@wangeditor/editor'
import type { BarSearchFilter } from '@/components/bar-search'

type FetahFunction = (word: string) => Promise<LabelValue[]>
type FilterFetahFunction = (filter: BarSearchFilter) => Promise<LabelValue[]>

function resolveList<T>() {
  return () => Promise.resolve<T[]>([])
}

export type GlobalEditorConfig = ReturnType<typeof createGlobalEditorConfig>

export interface SSMLEditorConfig {
  editorConfig?: IEditorConfig
  handleError: (error: string) => void
  fetchPinyin: FetahFunction
  fetchEnglish: FetahFunction
  fetchBgm: FilterFetahFunction
  fetchSpecial: FilterFetahFunction
}

export function createGlobalEditorConfig(config?: SSMLEditorConfig) {
  const editorConfig = config?.editorConfig || { maxLength: 5000, placeholder: '请输入内容...' }
  const handleError = config?.handleError || (() => {})
  const fetchPinyin = config?.fetchPinyin || resolveList<LabelValue>()
  const fetchEnglish = config?.fetchPinyin || resolveList<LabelValue>()
  const fetchBgm: FilterFetahFunction = config?.fetchBgm || resolveList<LabelValue>()
  const fetchSpecial: FilterFetahFunction = config?.fetchSpecial || resolveList<LabelValue>()

  return {
    editorConfig,
    handleError,
    fetchPinyin,
    fetchEnglish,
    fetchBgm,
    fetchSpecial,
    speed,
    pitch,
    demoAvatar,
  }
}
