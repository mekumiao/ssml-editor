import type { IDomEditor } from '@wangeditor/editor'
import ee from 'event-emitter'
import type { Speaker } from '@/model'

const emitter = ee() as EventBus

export { emitter }

interface EmitterEventMap {
  error: [message: string, detail?: unknown]
  'view-click': [event: MouseEvent]
  'view-keydown': [event: KeyboardEvent]
  'speaker-star': [speakerId: string, isStar: boolean]
  'editor-created': [editor: IDomEditor]
  'tryplay-speaker-select': [speaker: Speaker]
}

type EmitterMethod<K extends keyof EmitterEventMap> = (...args: EmitterEventMap[K]) => void

declare interface EventBus {
  emit<K extends keyof EmitterEventMap>(type: K, ...args: EmitterEventMap[K]): void
  off<K extends keyof EmitterEventMap>(type: K, listener: EmitterMethod<K>): void
  on<K extends keyof EmitterEventMap>(type: K, listener: EmitterMethod<K>): void
  once<K extends keyof EmitterEventMap>(type: K, listener: EmitterMethod<K>): void
}
