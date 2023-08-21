import { DomEditor, type IDomEditor } from '@wangeditor/editor'
import type { SSMLElementType, W } from './custom-types'
import { WANGEDITOR_EVENT } from '@/constant'

type Speak = {
  volume: string
  pitch: string
  rate: string
  voice: string
  bgm: string
  bgmRemark: string
  backgroundMusicVolume: string
}

function isType(type: string, dest: SSMLElementType) {
  return type === dest
}

function withSSML<T extends IDomEditor>(editor: T) {
  const {
    isInline,
    isVoid,
    deleteBackward,
    deleteForward,
    insertBreak,
    getHtml,
    apply,
    normalizeNode
  } = editor
  const newEditor = editor

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem)

    if (isType(type, 'ssml-w')) return true
    if (isType(type, 'ssml-p')) return true
    if (isType(type, 'ssml-break')) return true
    if (isType(type, 'ssml-say-as')) return true
    if (isType(type, 'ssml-sub')) return true
    if (isType(type, 'ssml-prosody')) return true
    if (isType(type, 'ssml-audio')) return true

    return isInline(elem)
  }

  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem)

    if (isType(type, 'ssml-w')) {
      const { phoneme } = elem as W
      return !!phoneme
    }
    if (isType(type, 'ssml-p')) return true
    if (isType(type, 'ssml-break')) return true
    if (isType(type, 'ssml-say-as')) return false
    if (isType(type, 'ssml-sub')) return true
    if (isType(type, 'ssml-prosody')) return false
    if (isType(type, 'ssml-audio')) return true

    return isVoid(elem)
  }

  newEditor.deleteBackward = (unit) => {
    deleteBackward(unit)
  }

  newEditor.deleteForward = (unit) => {
    deleteForward(unit)
  }

  newEditor.insertBreak = () => {
    insertBreak()
  }

  newEditor.normalizeNode = (entry) => {
    normalizeNode(entry)
  }

  const speak: Partial<Speak> = { voice: '', volume: '', pitch: '' }

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
    const el = []
    for (const key in speak) {
      if (Object.prototype.hasOwnProperty.call(speak, key)) {
        //@ts-ignore
        const element = speak[key]
        if (element) el.push(`${key}=${element}`)
      }
    }
    return `<speak ${el.join(' ')}>${getHtml()}</speak>`
  }

  newEditor.apply = (operation) => {
    apply(operation)
  }

  return newEditor
}

export default withSSML
