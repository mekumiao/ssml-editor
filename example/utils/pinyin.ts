import { polyphonic } from 'pinyin-pro'
import pinyinize from 'pinyinize'
import type { LabelValue } from '@/model'

export interface PolyphoneData {
  word: string
  pinyin: string[]
}

export function getPolyphoneData(word: string): PolyphoneData {
  if (!word || word.length > 1) throw new Error('word必须是一个中文字符')
  return {
    word,
    pinyin: polyphonic(word, { type: 'array', toneType: 'num' })[0],
  }
}

function isSoftly(pinyin: string) {
  return pinyin[pinyin.length - 1] === '0'
}

function addSpace(pinyin: string) {
  return pinyin.replace(/([\d])/g, ' $1')
}

export function convertSoftlyTo5(pinyin: string) {
  return isSoftly(pinyin) ? `${pinyin.slice(0, pinyin.length - 1)}5` : pinyin
}

export function clearSoftly0(pinyin: string) {
  return isSoftly(pinyin) ? pinyin.slice(0, pinyin.length - 1) : pinyin
}

export function polyphoneDataToLabelValue(data: PolyphoneData): LabelValue[] {
  return data.pinyin.map((v) => ({
    label: pinyinize(clearSoftly0(v)),
    value: addSpace(convertSoftlyTo5(v)),
  }))
}
