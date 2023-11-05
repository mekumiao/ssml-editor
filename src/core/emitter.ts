import type { IDomEditor } from '@wangeditor/editor'
import type { SSMLBaseElement } from './base'

type Result<T, Output> = T extends undefined ? undefined : Output

export function getEmitter<T extends IDomEditor | undefined>(editor: T): Result<T, EventBus> {
  if (!editor) return undefined as Result<T, EventBus>
  return {
    emit: editor.emit,
    off: editor.off,
    on: editor.on,
    once: editor.once,
  } as Result<T, EventBus>
}

interface EmitterEventMap {
  'ssml-remark-click': [editor: IDomEditor, elem: SSMLBaseElement]
  'ssml-update': [editor: IDomEditor]
}

type EmitterMethod<K extends keyof EmitterEventMap> = (...args: EmitterEventMap[K]) => void

interface EventBus {
  emit<K extends keyof EmitterEventMap>(type: K, ...args: EmitterEventMap[K]): void
  off<K extends keyof EmitterEventMap>(type: K, listener: EmitterMethod<K>): void
  on<K extends keyof EmitterEventMap>(type: K, listener: EmitterMethod<K>): void
  once<K extends keyof EmitterEventMap>(type: K, listener: EmitterMethod<K>): void
}
