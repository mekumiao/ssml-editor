import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import DataSource from './data'
import type { FilterBarSearch } from '@/components/bar-search'
import type { FilterSpeaker, LabelValue, Speaker } from '@/model'
import voices from './voices'
import { getStyleDes, getRoleDes } from './emoji-config'
import type { AudioInfo } from '@/menu/conversion-menu/data'
import type { RecentUsageSpeaker } from '@/menu/management-menu/data'

const mock = new MockAdapter(axios)

mock.onGet('/english').reply((config) => {
  const word = config.params.word as string
  const data = (DataSource.english as Record<string, LabelValue[]>)[word] ?? []
  return [200, data]
})

mock.onGet('/bgm').reply((config) => {
  const filter = config.params as FilterBarSearch
  const data = DataSource.audio
    .filter((v) => v.label.includes(filter.word))
    .filter((v) => v.menu.includes(filter.menu))
    .filter((v) => v.scene.includes(filter.scene))
    .filter((v) => v.style.includes(filter.style))
  return [200, data]
})

mock.onGet('/special').reply((config) => {
  const filter = config.params as FilterBarSearch
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
          displayName: v.LocalName,
          name: v.name,
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

  if (filter.category === '常用') {
    return [200, data.slice(0, 5)]
  }
  if (filter.category === '已购') {
    return [200, data.slice(5, 10)]
  }
  if (filter.category === '收藏') {
    return [200, data.slice(10, 15)]
  }
  if (filter.category === '我的') {
    return [200, data.slice(15, 20)]
  }

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

mock.onPost('/upload').reply(() => {
  const data: AudioInfo = { id: '1', src: DataSource.audio[0].value }
  return [200, data]
})

mock.onPut('/transfer').reply(() => {
  const data: AudioInfo = { id: '1', src: DataSource.audio[0].value }
  return [200, data]
})

mock.onGet('/conversionSpeaker').reply(() => {
  const data = voices.map(
    (v) =>
      <Speaker>{
        displayName: v.LocalName,
        name: v.name,
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

mock.onPost('/play').reply(() => {
  const audio = DataSource.audio.find((v) => v.label === 'creativeminds') || DataSource.audio[0]
  return [200, <AudioInfo>{ id: 'id', src: audio.value }]
})

mock.onPost('/recentUsage').reply((config) => {
  const recent = JSON.parse(config.data) as RecentUsageSpeaker
  const data = { ...recent, id: '123' }
  return [200, data]
})

mock.onGet('/recentUsage').reply(() => {
  const data = <RecentUsageSpeaker[]>[
    {
      category: '',
      label: '晓萱|年轻成年女性|冷静|1.0x',
      name: 'zh-CN-XiaoxuanNeural',
      pitch: '0',
      role: 'YoungAdultFemale',
      speed: '1.0',
      style: 'calm',
    },
    {
      category: '',
      label: '晓萱|年轻成年女性|冷静|1.0x',
      name: 'zh-CN-XiaoxuanNeural',
      pitch: '0',
      role: 'YoungAdultFemale',
      speed: '1.0',
      style: 'calm',
    },
    {
      category: '',
      label: '晓萱|年轻成年女性|冷静|1.0x',
      name: 'zh-CN-XiaoxuanNeural',
      pitch: '0',
      role: 'YoungAdultFemale',
      speed: '1.0',
      style: 'calm',
    },
    {
      category: '',
      label: '晓萱|年轻成年女性|冷静|1.0x',
      name: 'zh-CN-XiaoxuanNeural',
      pitch: '0',
      role: 'YoungAdultFemale',
      speed: '1.0',
      style: 'calm',
    },
  ]
  return [200, data]
})

mock.onDelete('/recentUsage').reply(() => {
  return [200]
})
