import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import DataSource from './data'
import type { BarSearchFilter } from '@/components/bar-search'

const mock = new MockAdapter(axios)

mock.onGet('/pinyin').reply((config) => {
  const word = config.params.word
  const data = DataSource.pinyin[word] ?? []
  return [200, data]
})

mock.onGet('/english').reply((config) => {
  const word = config.params.word
  const data = DataSource.english[word] ?? []
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
