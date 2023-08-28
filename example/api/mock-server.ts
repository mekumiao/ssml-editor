import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import DataSource from './data'
import type { BarSearchFilter } from '@/components/bar-search'
import cnchar from 'cnchar'
import 'cnchar-poly'
import type { FilterSpeaker, LabelValue, Speaker } from '@/model'

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
    .filter((v) => v.label.includes(filter.word))
    .filter((v) => v.menu.includes(filter.menu))
    .filter((v) => v.scene.includes(filter.scene))
    .filter((v) => v.style.includes(filter.style))
  return [200, data]
})

mock.onGet('/special').reply((config) => {
  const filter = config.params as BarSearchFilter
  const data = DataSource.audio
    .filter((v) => v.label.includes(filter.word))
    .filter((v) => v.menu.includes(filter.menu))
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

mock.onGet('/tag').reply(() => {
  return [200, DataSource.speaker.tags]
})

mock.onGet('/speaker').reply((config) => {
  const filter = config.params as FilterSpeaker
  const data = DataSource.speaker.children
    .filter((v) => v.name.includes(filter.word))
    .filter((v) => v.tags.includes(filter.tag))
    .filter((v) => v.category.includes(filter.category))
    .filter((v) => v.gender.includes(filter.gender))
    .map(
      (v, i) =>
        <Speaker>{
          label: v.remark,
          value: i === 0 ? v.name : `${v.name}${i}`,
          isFree: false,
          isStar: false,
          isSupper24K: true,
          avatar: '',
          roles: v.roles.map((n) => ({ label: n.remark, value: n.name })),
          styles: v.styles.map((n) => ({ label: n.remark, value: n.name })),
        },
    )
  return [200, data]
})

mock.onGet('/star').reply((config) => {
  const { speaker, star } = config.params
  const [child] = DataSource.speaker.children.filter((v) => v.name === speaker)
  if (child) {
    child.isStar = star
    return [200, child.isStar]
  }
  return [404]
})

mock.onGet('/flag').reply((config) => {
  const { flag } = config.params
  const list = DataSource.speaker.children.map(
    (v, i) =>
      <Speaker>{
        label: v.remark,
        value: i === 0 ? v.name : `${v.name}${i}`,
        isFree: false,
        isStar: false,
        isSupper24K: true,
        avatar: '',
        roles: v.roles.map((n) => ({ label: n.remark, value: n.name })),
        styles: v.styles.map((n) => ({ label: n.remark, value: n.name })),
      },
  )
  const data = flag === '收藏' ? list.filter((v) => v.isStar) : list
  return [200, data]
})
