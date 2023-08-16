/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SlateElement } from '@wangeditor/editor'
import type { Speaker, Read } from './custom-types'

function paragraphToHtml(elem: SlateElement, childrenHtml: string) {
  return `<s>${childrenHtml}</s>`
}

function continuousToHtml(elem: SlateElement, childrenHtml: string): string {
  return `<w>${childrenHtml}</w>`
}

function speakerToHtml(elem: SlateElement, childrenHtml: string): string {
  const { pinyin, character } = elem as Speaker
  return `<phoneme alphabet="py" ph="${pinyin}">${character}</phoneme>`
}

function renderReadToHtml(elem: SlateElement, childrenHtml: string): string {
  const { inId } = elem as Read
  return `<say-as interpret-as="${inId}">${childrenHtml}</say-as>`
}

export const elemToHtmls = [
  {
    type: 'paragraph',
    elemToHtml: paragraphToHtml
  },
  {
    type: 'read',
    elemToHtml: renderReadToHtml
  },
  {
    type: 'speaker',
    elemToHtml: speakerToHtml
  },
  {
    type: 'continuous',
    elemToHtml: continuousToHtml
  }
]

export {}
