import { polyphonic } from 'pinyin-pro'
import pinyinize from 'pinyinize'
import type { LabelValue } from '@/model'

export interface PolyphoneData {
  /**
   * 单个汉字
   */
  word: string
  /**
   * 拼音列表: 例如 wo0 wo1 wo2 wo3 wo4
   */
  pinyin: string[]
}

export function getPolyphoneData(word: string): PolyphoneData {
  if (!word || word.length > 1) throw new Error('word必须是一个中文字符')
  return {
    word,
    pinyin: polyphonic(word, { type: 'array', toneType: 'num' })[0],
  }
}

/**
 * 判断数字音调拼音是否是轻音.(以0结尾)
 * @param pinyin 数字音调拼音
 * @returns
 */
function isSoftly(pinyin: string) {
  return pinyin[pinyin.length - 1] === '0'
}

/**
 * 将数字音调0转为5
 * @param pinyin 数字音调拼音
 * @returns
 */
export function convertSoftlyTo5(pinyin: string) {
  return isSoftly(pinyin) ? `${pinyin.slice(0, pinyin.length - 1)}5` : pinyin
}

/**
 * 去除数字音调0
 * @param pinyin 数字音调拼音
 * @returns 
 */
export function clearSoftly0(pinyin: string) {
  return isSoftly(pinyin) ? pinyin.slice(0, pinyin.length - 1) : pinyin
}

/**
 *
 * @param data 多音字及拼音
 * @returns 拼音LabelValue[], 例如:
 * ```ts
 * [{ label: 'dōu', value: 'dou1' }, { label: 'dou', value: 'dou0' }]
 * ```
 */
export function polyphoneDataToLabelValue(data: PolyphoneData): LabelValue[] {
  return data.pinyin.map((v) => ({
    label: pinyinize(clearSoftly0(v)),
    value: v,
  }))
}
