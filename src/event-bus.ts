import type { IDomEditor } from '@wangeditor/editor'
import ee from 'event-emitter'
import type { Speaker } from '@/model'
import type { DeepReadonly, UnwrapNestedRefs } from 'vue'

const emitter = ee() as EventBus

export { emitter }

interface EmitterEventMap {
  warn: [message: string]
  error: [error: unknown]
  'view-click': [event: MouseEvent]
  'view-keydown': [event: KeyboardEvent]
  'editor-created': [editor: IDomEditor]
  'tryplay-speaker-select': [speaker: Speaker]
  'tryplay-speaker-update-star': [speakerId: string, isStar: boolean]
  'tryplay-speaker-detail-show': [speaker: DeepReadonly<UnwrapNestedRefs<Speaker>>]
}

type EmitterMethod<K extends keyof EmitterEventMap> = (...args: EmitterEventMap[K]) => void

interface EventBus {
  emit<K extends keyof EmitterEventMap>(type: K, ...args: EmitterEventMap[K]): void
  off<K extends keyof EmitterEventMap>(type: K, listener: EmitterMethod<K>): void
  on<K extends keyof EmitterEventMap>(type: K, listener: EmitterMethod<K>): void
  once<K extends keyof EmitterEventMap>(type: K, listener: EmitterMethod<K>): void
}
