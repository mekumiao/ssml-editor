import { DomEditor, type IDomEditor } from '@wangeditor/editor'
import type { SSMLElementType, W } from './custom-types'

type Speak = { volume: string; pitch: string; rate: string; voice: string }
type Option = { value: string; label: string }

function isType(type: string, dest: SSMLElementType) {
  return type === dest
}

function withSSML<T extends IDomEditor>(editor: T) {
  const { isInline, isVoid, deleteBackward, deleteForward, insertBreak, getHtml, apply } = editor
  const newEditor = editor

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem)

    if (isType(type, 'ssml-w')) return true
    if (isType(type, 'ssml-p')) return true
    if (isType(type, 'ssml-break')) return true
    if (isType(type, 'ssml-say-as')) return true
    if (isType(type, 'ssml-sub')) return true
    if (isType(type, 'ssml-prosody')) return true

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

  const speak = {} as Speak
  const bgm = {} as Option

  editor.on('updateSpeak', (value: Speak) => {
    Object.assign(speak, value)
  })

  editor.on('updateBgm', (value: Option) => {
    Object.assign(bgm, value)
  })

  editor.on('removeBgm', () => {
    Object.assign(bgm, { value: '', label: '' })
  })

  newEditor.getHtml = () => {
    const xml = getHtml()
    return `<speak volume="${speak.volume}" pitch="${speak.pitch}" rate="${speak.rate}" voice="${speak.voice}">${xml}</speak>`
  }

  newEditor.apply = (operation) => {
    apply(operation)
  }

  return newEditor
}

export default withSSML
