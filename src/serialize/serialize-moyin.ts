import { DomEditor, SlateEditor, SlateElement, SlateNode, SlateText } from '@wangeditor/editor'
import type { IDomEditor } from '@wangeditor/editor'
import type { Break } from '@/core/break'
import type { Phoneme } from '@/core/phoneme'
import type { Prosody } from '@/core/prosody'
import type { SayAs } from '@/core/say-as'
import type { Sub } from '@/core/sub'
import type { Speak } from '@/core/speak'
import type { SSMLElementType } from '@/core/custom-types'
import { useEditorStore, useSSMLStore } from '@/stores'
import type { MoyinW } from '@/core/moyin-w'

function serializeBreak(node: Break) {
  if (node.time) {
    return `<break time="${node.time}"/>`
  } else if (node.strength) {
    switch (node.strength) {
      case 'x-weak':
        return `<break time="200ms"/>`
      case 'weak':
        return `<break time="300ms"/>`
      case 'medium':
        return `<break time="500ms"/>`
      case 'strong':
        return `<break time="700ms"/>`
      case 'x-strong':
        return `<break time="1000ms"/>`
      default:
        return `<break time="200ms"/>`
    }
  }
  return `<break/>`
}

function serializePhoneme(node: Phoneme, children: string) {
  if (!node.ph) return children
  return `<p phoneme="${node.ph}">${children}</phoneme>`
}

function serializeProsody(node: Prosody, children: string) {
  if (!node.contour && !node.pitch && !node.range && !node.rate && !node.volume) return children
  const contour = node.contour ? ` contour="${node.contour}"` : ''
  const pitch = node.pitch ? ` pitch="${node.pitch}"` : ''
  const range = node.range ? ` range="${node.range}"` : ''
  const volume = node.volume ? ` volume="${node.volume}"` : ''
  const rate = node.rate ? ` rate="${node.rate}"` : ''
  return `<prosody${contour}${pitch}${range}${volume}${rate}>${children}</prosody>`
}

function serializeSayAs(node: SayAs, children: string) {
  if (!node.interpretAs) return children
  const interpretAs =
    node.interpretAs === 'cardinal'
      ? 'value'
      : node.interpretAs === 'characters'
      ? 'digits'
      : node.interpretAs
  return `<say-as interpret-as="${interpretAs}">${children}</say-as>`
}

function serializeMoyinW(node: MoyinW, children: string) {
  const phoneme = node.phoneme ? ` phoneme="${node.phoneme}"` : ''
  return `<w${phoneme}>${children}</w>`
}

function serializeSub(node: Sub, children: string) {
  return `<sub alias=${node.alias}>${children}</sub>`
}

function serializeSpeak(node: Speak, children: string) {
  return `<speak version="${node.version}" xml:lang="${node.xmlLang}" xmlns="http://www.w3.org/2001/10/synthesis">${children}</speak>`
}

function serializeNode(node: SlateNode): string {
  if (SlateText.isText(node)) {
    return node.text
  } else if (SlateElement.isElement(node)) {
    const children = node.children.map((n) => serializeNode(n)).join('')
    const type = DomEditor.getNodeType(node) as SSMLElementType
    switch (type) {
      case 'ssml-speak':
        return serializeSpeak(node as Speak, children)
      case 'ssml-break':
        return serializeBreak(node as Break)
      case 'ssml-phoneme':
        return serializePhoneme(node as Phoneme, children)
      case 'ssml-prosody':
        return serializeProsody(node as Prosody, children)
      case 'ssml-say-as':
        return serializeSayAs(node as SayAs, children)
      case 'ssml-sub':
        return serializeSub(node as Sub, children)
      case 'moyin-w':
        return serializeMoyinW(node as MoyinW, children)
      default:
        return children
    }
  }
  return ''
}

function createDefaultProsodyHandler() {
  const { rootProsody } = useSSMLStore()
  const prosody = { ...rootProsody, children: [] } as Prosody

  function pushNode(node: SlateNode) {
    prosody.children.push(node)
  }

  return { prosody, pushNode }
}

/**
 * 默认段落停顿
 */
function paragraphBreak(): Break {
  return {
    type: 'ssml-break',
    strength: 'medium',
    children: [{ text: '' }],
    remark: 'paragraphBreak',
  }
}

/**
 * 合并段落,并添加停顿
 * @param editor IDomEditor对象
 * @returns 合并后的节点
 */
function mergeParagraphNodes(editor: IDomEditor): SlateNode[] {
  const arrayList = editor.children
    .filter((v) => DomEditor.checkNodeType(v, 'paragraph'))
    .filter((v) => !!SlateNode.string(v as SlateElement).trim())
    .map((v, i, ls) => {
      const elem = v as SlateElement
      const list = elem.children as SlateNode[]
      if (i < ls.length - 1) return list.concat([paragraphBreak()])
      return list
    })
  return ([] as SlateNode[]).concat(...arrayList)
}

/**
 * 处理自定义的多人语音标签
 * 1. 多人语音标签已被限制为顶级标签
 * 2. 没有多人语音标签的节点将被合并添加默认语音标签
 */
function handleCustomManagementNode(editor: IDomEditor) {
  const nodes = mergeParagraphNodes(editor)
  const wrapNodes: SlateNode[] = []
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    // 跳过空节点
    if (SlateText.isText(node) && !node.text) continue
    // 多人语音节点
    if (DomEditor.checkNodeType(node, 'custom-management')) {
      continue
    }

    if (SlateText.isText(node)) {
      const { pushNode } = createDefaultProsodyHandler()
      pushNode(node)
      continue
    } else if (!SlateEditor.isVoid(editor, node)) {
      const path = DomEditor.findPath(editor, node)
      const [nodeEntity] = SlateEditor.nodes(editor, {
        at: path,
        mode: 'lowest',
        voids: false,
        match: (n) => {
          return DomEditor.checkNodeType(n, 'ssml-prosody')
        },
      })

      if (!nodeEntity) {
        const { pushNode } = createDefaultProsodyHandler()
        pushNode(node)
        continue
      }

      continue
    }
  }
  return wrapNodes
}

export default function serializeToSSML() {
  const { editor } = useEditorStore()
  if (!editor) throw Error('没有找到 editor 对象')
  const speaks = handleCustomManagementNode(editor)
  const ssmls = speaks.map((v) => serializeNode(v))
  return ssmls
}
