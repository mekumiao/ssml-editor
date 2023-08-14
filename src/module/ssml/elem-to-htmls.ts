import type { SlateElement } from '@wangeditor/editor'
import type { Polyphone, SayAs } from './custom-types'

function paragraphToHtml(elem: SlateElement, childrenHtml: string) {
  return `<s>${childrenHtml}</s>`
}

function continuousToHtml(elem: SlateElement, childrenHtml: string): string {
  return `<w>${childrenHtml}</w>`
}

function polyphoneToHtml(elem: SlateElement, childrenHtml: string): string {
  const { pinyin } = elem as Polyphone
  return `<phoneme alphabet="py" ph="${pinyin}">${childrenHtml}</phoneme>`
}

function renderSayAsToHtml(elem: SlateElement, childrenHtml: string): string {
  const { interpret } = elem as SayAs
  return `<say-as interpret-as="${interpret}">${childrenHtml}</say-as>`
}

export default [
  {
    type: 'paragraph',
    elemToHtml: paragraphToHtml
  },
  {
    type: 'polyphone',
    elemToHtml: polyphoneToHtml
  },
  {
    type: 'continuous',
    elemToHtml: continuousToHtml
  },
  {
    type: 'say-as',
    elemToHtml: renderSayAsToHtml
  }
]
