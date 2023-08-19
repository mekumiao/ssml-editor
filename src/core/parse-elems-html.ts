import { type SlateDescendant, SlateElement } from '@wangeditor/editor'
import type { W } from '.'

function paragraph(_domElem: Element, children: SlateDescendant[]): SlateElement {
  const node = {
    type: 'paragraph',
    children: children
  }

  return node
}

function w(domElem: Element, children: SlateDescendant[]): SlateElement {
  const phoneme = domElem.getAttribute('phoneme')

  if (phoneme) {
    return {
      type: 'ssml-w',
      phoneme: phoneme,
      value: domElem.textContent,
      children: [{ text: domElem.textContent || '' }]
    } as W
  }

  return {
    type: 'ssml-w',
    children: children
  } as W
}

// function p(domElem: Element): P {
//   const phoneme = domElem.getAttribute('ph') || ''
//   const word = domElem.textContent || ''

//   return {
//     type: 'ssml-p',
//     phoneme: phoneme,
//     word: word,
//     children: [{ text: word }]
//   }
// }

export default [
  {
    selector: 's',
    parseElemHtml: paragraph
  },
  {
    selector: 'w',
    parseElemHtml: w
  }
]
