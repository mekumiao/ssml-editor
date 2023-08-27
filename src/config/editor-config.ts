import type { LabelValue } from '@/model'
import type { IEditorConfig } from '@wangeditor/editor'
import type { BarSearchFilter, BarSearchMenuItemLabel } from '@/components/bar-search'

type FetahFunction = (word: string) => Promise<LabelValue[]>
type FilterFetahFunction = (filter: BarSearchFilter) => Promise<LabelValue[]>

function resolveList<T>() {
  return () => Promise.resolve<T[]>([])
}

export type GlobalEditorConfig = ReturnType<typeof createGlobalEditorConfig>

export interface SSMLEditorConfig {
  editorConfig?: IEditorConfig
  handleError: (error: string) => void
  pinyin: {
    fetchData: FetahFunction
  }
  english: {
    fetchData: FetahFunction
  }
  bgm: {
    menuItemLabel?: BarSearchMenuItemLabel
    fetchScene: () => Promise<LabelValue[]>
    fetchStyle: () => Promise<LabelValue[]>
    fetchData: FilterFetahFunction
  }
  special: {
    menuItemLabel?: BarSearchMenuItemLabel
    fetchScene: () => Promise<LabelValue[]>
    fetchStyle: () => Promise<LabelValue[]>
    fetchData: FilterFetahFunction
  }
}

export function createGlobalEditorConfig(config?: SSMLEditorConfig) {
  const editorConfig = config?.editorConfig || { maxLength: 5000, placeholder: '请输入内容...' }
  const handleError = config?.handleError || (() => {})
  const pinyin = config?.pinyin || { fetchData: resolveList<LabelValue>() }
  const english = config?.english || { fetchData: resolveList<LabelValue>() }
  const special = config?.special || {
    fetchData: resolveList<LabelValue>(),
    fetchScene: resolveList<LabelValue>(),
    fetchStyle: resolveList<LabelValue>(),
  }
  const bgm = config?.bgm || {
    fetchData: resolveList<LabelValue>(),
    fetchScene: resolveList<LabelValue>(),
    fetchStyle: resolveList<LabelValue>(),
  }
  special.menuItemLabel ??= { default: '默认音效', custom: '自定义音效', history: '最近音效' }
  bgm.menuItemLabel ??= { default: '默认配乐', custom: '自定义配乐', history: '最近配乐' }

  const specialRequired = special as Required<SSMLEditorConfig['special']>
  const bgmRequired = bgm as Required<SSMLEditorConfig['bgm']>

  return {
    editorConfig,
    handleError,
    pinyin,
    english,
    bgm: bgmRequired,
    special: specialRequired,
  }
}
