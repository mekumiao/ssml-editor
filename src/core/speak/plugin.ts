import { WANGEDITOR_EVENT } from '@/constant'
import { type IDomEditor } from '@wangeditor/editor'
import type { Speak } from './custom-types'
import type { LabelValue } from '@/model'

export default <T extends IDomEditor>(editor: T) => {
  const { getHtml } = editor
  const newEditor = editor

  const speak: Partial<Speak> = {
    volume: '',
    pitch: '',
    rate: '',
    voice: '',
    bgm: '',
    bgmRemark: '',
    backgroundMusicVolume: ''
  }

  editor.on(WANGEDITOR_EVENT.UPDATE_SPEAK, (value: Partial<Speak>) => {
    Object.assign(speak, value)
  })

  editor.on(WANGEDITOR_EVENT.UPDATE_BGM, (value: Partial<LabelValue>) => {
    speak.bgm = value.value
    speak.bgmRemark = value.label
  })

  editor.on(WANGEDITOR_EVENT.REMOVE_BGM, () => {
    speak.bgm = undefined
    speak.bgmRemark = undefined
  })

  newEditor.getHtml = () => {
    const exclude = ['bgmRemark']
    const el = []
    for (const key in speak) {
      if (Object.prototype.hasOwnProperty.call(speak, key)) {
        // @ts-ignore
        const element = speak[key]
        if (element && !exclude.includes(key)) {
          el.push(`${key}=${element}`)
        }
      }
    }
    return `<speak ${el.join(' ')}>${getHtml()}</speak>`
  }

  return newEditor
}
