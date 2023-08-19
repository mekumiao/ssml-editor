import type { SlateElement } from '@wangeditor/editor'
import type { P, W, SayAs, Break, Sub, Prosody, SSMLElementType, Audio } from './custom-types'

function insertBreak(childrenHtml: string): string {
  // const _break = break2({ time: '300ms' } as any, '')
  // return childrenHtml.replaceAll(/[,.，。]/gi, (substring) => substring + _break)
  return childrenHtml
}

function paragraph(_elem: SlateElement, childrenHtml: string) {
  return `<s>${insertBreak(childrenHtml)}</s>`
}

function w(elem: SlateElement, childrenHtml: string): string {
  const { phoneme, value } = elem as W

  return phoneme ? `<w phoneme="${phoneme}">${value}</w>` : `<w>${childrenHtml}</w>`
}

function p(elem: SlateElement): string {
  const { word, phoneme } = elem as P
  return `<p ph="${phoneme}">${word}</p>`
}

function sayAs(elem: SlateElement, childrenHtml: string): string {
  const { interpretAs } = elem as SayAs
  return `<say-as interpret-as="${interpretAs}">${childrenHtml}</say-as>`
}

function break2(elem: SlateElement): string {
  const { time } = elem as Break
  return `<break time="${time}" />`
}

function sub(elem: SlateElement) {
  const { alias, value } = elem as Sub
  return `<sub alias="${alias}">${value}</sub>`
}

function prosody(elem: SlateElement, childrenHtml: string) {
  const { rate } = elem as Prosody
  return `<prosody rate="${rate}">${childrenHtml}</prosody>`
}

function audio(elem: SlateElement) {
  const { src } = elem as Audio
  return `<audio src="${src}" />`
}

export default [
  {
    type: 'paragraph',
    elemToHtml: paragraph
  },
  {
    type: 'ssml-w',
    elemToHtml: w
  },
  {
    type: 'ssml-p',
    elemToHtml: p
  },
  {
    type: 'ssml-say-as',
    elemToHtml: sayAs
  },
  {
    type: 'ssml-break',
    elemToHtml: break2
  },
  {
    type: 'ssml-sub',
    elemToHtml: sub
  },
  {
    type: 'ssml-prosody',
    elemToHtml: prosody
  },
  {
    type: 'ssml-audio',
    elemToHtml: audio
  }
] as {
  type: SSMLElementType
  elemToHtml: (elem: SlateElement, childrenHtml: string) => string
}[]
