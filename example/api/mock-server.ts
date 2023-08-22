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
