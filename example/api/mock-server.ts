import type { Filter } from '@/model'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

mock.onGet('/speaker').reply((config) => {
  const word = config.params.word
  return [
    200,
    word == '我'
      ? [
          { label: 'wo1', value: 'wo1' },
          { label: 'wo2', value: 'wo2' },
          { label: 'wo3', value: 'wo3' }
        ]
      : [
          { label: 'de1', value: 'de1' },
          { label: 'de2', value: 'de2' },
          { label: 'de3', value: 'de3' }
        ]
  ]
})

mock.onGet('/english').reply((config) => {
  const word = config.params.word
  return [
    200,
    word == 'global' ? [{ label: 'ˈɡlōbəl', value: 'ˈɡlōbəl' }] : [{ label: 'wərd', value: 'wərd' }]
  ]
})

mock.onGet('/bgm').reply((config) => {
  const filter = config.params as Filter
  const data = []
  for (let i = 0; i < 20; i++) {
    data.push({
      value: `https://download.samplelib.com/wav/sample-6s.wav#${i + 1}`,
      label: `${filter.search}背景音乐${i + 1}`
    })
  }
  return [200, data]
})

mock.onGet('/special').reply((config) => {
  const filter = config.params as Filter
  const data = []
  for (let i = 0; i < 20; i++) {
    data.push({
      value: `https://download.samplelib.com/wav/sample-3s.wav#${i + 1}`,
      label: `${filter.search}音效${i + 1}`
    })
  }
  return [200, data]
})
