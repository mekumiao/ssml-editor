import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

mock.onGet('/speaker').reply(200, [
  { label: 'wo1', value: 'wo1' },
  { label: 'wo2', value: 'wo2' },
  { label: 'wo3', value: 'wo3' }
])

mock.onGet('/speaker', { params: { word: '的' } }).reply(200, [
  { label: 'de1', value: 'de1' },
  { label: 'de2', value: 'de2' },
  { label: 'de3', value: 'de3' }
])

mock.onGet('/english').reply(200, [{ label: 'wərd', value: 'wərd' }])

mock
  .onGet('/english', { params: { word: 'global' } })
  .reply(200, [{ label: 'ˈɡlōbəl', value: 'ˈɡlōbəl' }])

mock.onGet('/bgm').reply(200, [
  {
    value: 'https://download.samplelib.com/wav/sample-6s.wav#1',
    label: `背景音乐1`
  },
  {
    value: 'https://download.samplelib.com/wav/sample-6s.wav#2',
    label: `背景音乐2`
  },
  {
    value: 'https://download.samplelib.com/wav/sample-6s.wav#3',
    label: `背景音乐3`
  },
  {
    value: 'https://download.samplelib.com/wav/sample-6s.wav#4',
    label: `背景音乐4`
  }
])

mock.onGet('/special').reply(200, [
  {
    value: 'https://download.samplelib.com/wav/sample-3s.wav#1',
    label: `音效1`
  },
  {
    value: 'https://download.samplelib.com/wav/sample-3s.wav#2',
    label: `音效2`
  },
  {
    value: 'https://download.samplelib.com/wav/sample-3s.wav#3',
    label: `音效3`
  },
  {
    value: 'https://download.samplelib.com/wav/sample-3s.wav#4',
    label: `音效4`
  }
])
