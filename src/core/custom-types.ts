import type { Speak } from './speak'
import type { MsttsBackgroundaudio } from './mstts-backgroundaudio'
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
import type { Voice } from './voice'
import type { MsttsSilence } from './mstts-silence'

type UnionTypesMap<T extends { type: string }> = T extends any ? T['type'] : never

export * from './audio/custom-types'
export * from './break/custom-types'
export * from './emphasis/custom-types'
export * from './mstts-express-as/custom-types'
export * from './p/custom-types'
export * from './phoneme/custom-types'
export * from './prosody/custom-types'
export * from './s/custom-types'
export * from './say-as/custom-types'
export * from './sub/custom-types'
export * from './voice/custom-types'
export * from './mstts-backgroundaudio/custom-types'
export * from './speak/custom-types'
export * from './mstts-silence/custom-types'

export type SSMLElementType =
  | UnionTypesMap<Speak>
  | UnionTypesMap<MsttsExpressAs>
  | UnionTypesMap<MsttsBackgroundaudio>
  | UnionTypesMap<Break>
  | UnionTypesMap<Voice>
  | UnionTypesMap<Audio>
  | UnionTypesMap<Emphasis>
  | UnionTypesMap<Phoneme>
  | UnionTypesMap<Prosody>
  | UnionTypesMap<SayAs>
  | UnionTypesMap<Sub>
  | UnionTypesMap<P>
  | UnionTypesMap<S>
  | UnionTypesMap<MsttsSilence>
  | 'paragraph'
