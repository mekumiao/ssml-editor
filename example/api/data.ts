export default {
  pinyin: {
    我: [
      { label: 'wo1', value: 'wo 1' },
      { label: 'wo2', value: 'wo 2' },
      { label: 'wo3', value: 'wo 3' }
    ],
    的: [
      { label: 'de1', value: 'de 1' },
      { label: 'de2', value: 'de 2' },
      { label: 'de3', value: 'de 3' }
    ]
  } as Record<string, { label: string; value: string }[] | undefined>,
  english: {
    global: [{ label: 'ˈɡlōbəl', value: 'ˈɡlōbəl' }],
    world: [{ label: 'wərd', value: 'wərd' }]
  } as Record<string, { label: string; value: string }[] | undefined>,
  audio: [
    {
      label: '打鼓背景音',
      value: 'https://gcore.jsdelivr.net/gh/mekumiao/img-hosting/upload/1415_dhol-drums-01.mp3',
      scene: '',
      style: '',
      menuKey: 'first'
    },
    {
      label: '拨号背景音',
      value: 'https://gcore.jsdelivr.net/gh/mekumiao/img-hosting/upload/1378_dial-up-modem-01.mp3',
      scene: '',
      style: '',
      menuKey: 'first'
    },
    {
      label: '咕噜咕噜音效',
      value: 'https://gcore.jsdelivr.net/gh/mekumiao/img-hosting/upload/1814_water-bubbles-01.mp3',
      scene: '',
      style: '',
      menuKey: 'first'
    }
  ]
}
