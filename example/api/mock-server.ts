import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import DataSource from './data'
import type { BarSearchFilter } from '@/components/bar-search'
import cnchar from 'cnchar'
import 'cnchar-poly'
import type { FilterSpeaker, LabelValue, Speaker } from '@/model'
import voices from './voices'
import { getStyleDes, getRoleDes } from './emoji-config'

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
  const data = voices
    .filter((v) => v.LocalName.includes(filter.word))
    .filter((v) => v.gender.includes(filter.gender))
    .map(
      (v) =>
        <Speaker>{
          label: v.LocalName,
          value: v.name,
          isFree: false,
          isStar: false,
          isSupper24K: true,
          avatar: '',
          roles: v.VoiceRoleNames.split(',').map((n) => {
            const des = getRoleDes(n)
            return { label: des?.word ?? n, value: n, emoji: des?.emoji }
          }),
          styles: v.VoiceStyleNames.split(',').map((n) => {
            const des = getStyleDes(n)
            return { label: des?.word ?? n, value: n, emoji: des?.emoji }
          }),
        },
    )
  return [200, data]
})

mock.onGet('/star').reply((config) => {
  const { speaker, star } = config.params
  const [child] = voices.filter((v) => v.name === speaker)
  if (child) {
    return [200, star]
  }
  return [404]
})

mock.onGet('/flag').reply((config) => {
  const { flag } = config.params
  const list = voices.map(
    (v) =>
      <Speaker>{
        label: v.LocalName,
        value: v.name,
        isFree: false,
        isStar: false,
        isSupper24K: true,
        avatar: '',
        roles: v.VoiceRoleNames.split(',').map((n) => {
          const des = getRoleDes(n)
          return { label: des?.word ?? n, value: n, emoji: des?.emoji }
        }),
        styles: v.VoiceStyleNames.split(',').map((n) => {
          const des = getStyleDes(n)
          return { label: des?.word ?? n, value: n, emoji: des?.emoji }
        }),
      },
  )
  if (flag === '') {
    return [200, list.slice(0, 5)]
  }
  if (flag === '已购') {
    return [200, list.slice(5, 10)]
  }
  if (flag === '收藏') {
    return [200, list.slice(10, 15)]
  }
  if (flag === '我的') {
    return [200, list.slice(15, 20)]
  }
  return [200, list]
})
