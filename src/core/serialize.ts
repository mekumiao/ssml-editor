import {
  DomEditor,
  SlateElement,
  SlateNode,
  SlateText,
  type SlateDescendant
} from '@wangeditor/editor'
import type { Audio } from './audio'
import type { Break } from './break'
import type { Emphasis } from './emphasis'
import type { MsttsExpressAs } from './mstts-express-as'
import type { P } from './p'
import type { Phoneme } from './phoneme'
import type { Prosody } from './prosody'
import type { S } from './s'
import type { SayAs } from './say-as'
import type { Sub } from './sub'
import type { MsttsBackgroundaudio } from './mstts-backgroundaudio'
import type { Speak } from './speak'
import type { Voice } from './voice'
import type { W } from './w'

function escapeText(text: string): string {
  const result = text
    .replaceAll(/[&]/gi, '&amp;')
    .replaceAll(/[<]/gi, '&lt;')
    .replaceAll(/[>]/gi, '&gt;')
  return result
}

function serializeAudio(node: Audio, children?: string) {
  if (children) return `<audio src="${node.src}">${children}</audio>`
  return `<audio src="${node.src}"/>`
}

function serializeBreak(node: Break) {
  if (node.time) {
    return `<break time="${node.time}"/>`
  } else if (node.strength) {
    return `<break strength="${node.strength}"/>`
  }
  return `<break/>`
}

function serializeEmphasis(node: Emphasis, children: string) {
  if (node.level) {
    return `<emphasis level="${node.level}">${children}</emphasis>`
  }
  return `<emphasis>${children}</emphasis>`
}

function serializeMsttsExpressAs(node: MsttsExpressAs, children: string) {
  const role = node.role ? ` role="${node.role}"` : ''
  const styledegree = node.styledegree ? ` styledegree="${node.styledegree}"` : ''
  return `<mstts:express-as style="${node.style}"${role}${styledegree}>${children}</mstts:express-as>`
}

export function serializeMsttsBackgroundaudio(node: MsttsBackgroundaudio) {
  const volume = node.volume ? ` volume="${node.volume}"` : ''
  const fadein = node.fadein ? ` fadein="${node.fadein}"` : ''
  const fadeout = node.fadeout ? ` fadeout="${node.fadeout}"` : ''
  return `<mstts:backgroundaudio src="${node.src}"${volume}${fadein}${fadeout}/>`
}

function serializeP(_node: P, children: string) {
  return `<p>${children}</p>`
}

function serializePhoneme(node: Phoneme, children: string) {
  const alphabet = node.alphabet ? `alphabet="${node.alphabet}"` : ''
  return `<phoneme ph="${node.ph}"${alphabet}>${children}</phoneme>`
}

function serializeProsody(node: Prosody, children: string) {
  const contour = node.contour ? ` contour="${node.contour}"` : ''
  const pitch = node.pitch ? ` pitch="${node.pitch}"` : ''
  const range = node.range ? ` range="${node.range}"` : ''
  const volume = node.volume ? ` volume="${node.volume}"` : ''
  const rate = node.rate ? ` rate="${node.rate}"` : ''
  return `<prosody${contour}${pitch}${range}${volume}${rate}>${children}</prosody>`
}

function serializeSayAs(node: SayAs, children: string) {
  const interpretAs = node.interpretAs ? ` interpretAs="${node.interpretAs}"` : ''
  const format = node.format ? ` format="${node.format}"` : ''
  const detail = node.detail ? ` detail="${node.detail}"` : ''
  return `<say-as${interpretAs}${format}${detail}>${children}</say-as>`
}

function serializeS(_node: S, children: string) {
  return `<s>${children}</s>`
}

function serializeW(_node: W, children: string) {
  return `<w>${children}</w>`
}

function serializeSub(node: Sub, children: string) {
  return `<sub alias=${node.alias}>${children}</sub>`
}

export function serializeVoice(node: Voice, children: string) {
  const effect = node.effect ? ` effect="${node.effect}"` : ''
  return `<vocie name="${node.name}${effect}">${children}</vocie>`
}

export function serializeSpeak(node: Speak, children: string) {
  return `<speak version="${node.version}" xml:lang="${node.xmlLang}" xmlns="${node.xmlns}">${children}</speak>`
}

export function serializeNode(node: SlateNode): string {
  if (SlateText.isText(node)) {
    return escapeText(node.text)
  } else if (SlateElement.isElement(node)) {
    const children = node.children.map((n) => serializeNode(n)).join('')
    const type = DomEditor.getNodeType(node)
    switch (type) {
      case 'paragraph':
        return `<p>${children}</p>`
      case 'ssml-audio':
        return serializeAudio(node as Audio, children)
      case 'ssml-break':
        return serializeBreak(node as Break)
      case 'ssml-emphasis':
        return serializeEmphasis(node as Emphasis, children)
      case 'ssml-mstts:express-as':
        return serializeMsttsExpressAs(node as MsttsExpressAs, children)
      case 'ssml-p':
        return serializeP(node as P, children)
      case 'ssml-phoneme':
        return serializePhoneme(node as Phoneme, children)
      case 'ssml-prosody':
        return serializeProsody(node as Prosody, children)
      case 'ssml-s':
        return serializeS(node as S, children)
      case 'ssml-w':
        return serializeW(node as W, children)
      case 'ssml-say-as':
        return serializeSayAs(node as SayAs, children)
      case 'ssml-sub':
        return serializeSub(node as Sub, children)
      case 'ssml-voice':
        return serializeVoice(node as Voice, children)
      default:
        return children
    }
  }
  return ''
}

export function serializeToSSML(children: SlateDescendant[]) {
  const speak: Speak = {
    type: 'ssml-speak',
    version: '1.0',
    xmlLang: 'zh-CN',
    xmlns: 'http://www.w3.org/2001/10/synthesis'
  }
  const voice: Voice = {
    type: 'ssml-voice',
    name: 'XiaoXiao-晓晓',
    remark: '默认语音',
    children: []
  }
  const ssml = children.map((n) => serializeNode(n)).join('')
  return serializeSpeak(speak, serializeVoice(voice, ssml))
}
