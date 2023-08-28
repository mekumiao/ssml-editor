import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import DataSource from './data'
import type { BarSearchFilter } from '@/components/bar-search'
import cnchar from 'cnchar'
import 'cnchar-poly'
import type { LabelValue } from '@/model'

const mock = new MockAdapter(axios)

mock.onGet('/pinyin').reply((config) => {
  const word = config.params.word as string
  const poly = cnchar.spell(word, 'poly', 'low') as string
  const polyList = poly.replaceAll(/[()]/g, '').split('|')
  const genTone = (p: string) => Array.from({ length: 5 }).map((_, i) => (i == 0 ? p : `${p} ${i}`))
  const dataList = polyList.map((v) => genTone(v))
  const data = ([] as string[]).concat(...dataList).map((v) => ({ value: v, label: v }))
  return [200, data]
})

mock.onGet('/english').reply((config) => {
  const word = config.params.word as string
  const data = (DataSource.english as Record<string, LabelValue[]>)[word] ?? []
  return [200, data]
})

mock.onGet('/bgm').reply((config) => {
  const filter = config.params as BarSearchFilter
  const data = DataSource.audio
    .filter((v) => v.label.includes(filter.search))
    .filter((v) => v.menuKey.includes(filter.menuKey))
    .filter((v) => v.scene.includes(filter.scene))
    .filter((v) => v.style.includes(filter.style))
  return [200, data]
})

mock.onGet('/special').reply((config) => {
  const filter = config.params as BarSearchFilter
  const data = DataSource.audio
    .filter((v) => v.label.includes(filter.search))
    .filter((v) => v.menuKey.includes(filter.menuKey))
    .filter((v) => v.scene.includes(filter.scene))
    .filter((v) => v.style.includes(filter.style))
  return [200, data]
})

mock.onGet('/scene').reply(() => {
  const data = [
    { label: '默认场景', value: '' },
    { label: '场景1', value: '1' },
    { label: '场景2', value: '2' },
  ]
  return [200, data]
})

mock.onGet('/style').reply(() => {
  const data = [
    { label: '默认风格', value: '' },
    { label: '风格1', value: '1' },
    { label: '风格2', value: '2' },
  ]
  return [200, data]
})
