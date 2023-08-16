/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SlateElement } from '@wangeditor/editor'
import type { P, W, SayAs, Break, Sub, Prosody } from './custom-types'

function insertBreak(childrenHtml: string): string {
  const _break = break2({ time: '300ms' } as any, '')
  return childrenHtml.replaceAll(/[,.，。]/gi, (substring) => substring + _break)
}

function paragraph(elem: SlateElement, childrenHtml: string) {
  // return `<s>${insertBreak(childrenHtml)}</s>`
  return `<s>${childrenHtml}</s>`
}

function w(elem: SlateElement, childrenHtml: string): string {
  const { phoneme } = elem as W

  return phoneme ? `<w phoneme="${phoneme}">${childrenHtml}</w>` : `<w>${childrenHtml}</w>`
}

function p(elem: SlateElement, childrenHtml: string): string {
  const { word, phoneme } = elem as P
  return `<p alphabet="py" ph="${phoneme}">${word}</p>`
}

function sayAs(elem: SlateElement, childrenHtml: string): string {
  const { interpretAs } = elem as SayAs
  return `<say-as interpret-as="${interpretAs}">${childrenHtml}</say-as>`
}

function break2(elem: SlateElement, childrenHtml: string): string {
  const { time } = elem as Break
  return `<break time="${time}" />`
}

function sub(elem: SlateElement, childrenHtml: string) {
  const { value } = elem as Sub
  return `<sub alias="${childrenHtml}">${value}</sub>`
}

function prosody(elem: SlateElement, childrenHtml: string) {
  const { rate } = elem as Prosody
  return `<prosody rate="${rate}">${childrenHtml}</prosody>`
}

export const elemToHtmls = [
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
  }
]

export {}
