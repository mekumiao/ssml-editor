import type { Alias } from './alias'
import type { Changespeed } from './changespeed'
import type { Continuous } from './continuous'
import type { Digital } from './digital'
import type { English } from './english'
import type { Mute } from './mute'
import type { Read } from './read'
import type { Rhythm } from './rhythm'
import type { Speaker } from './speaker'
import type { Special } from './special'

type UnionTypesMap<T extends { type: string }> = T extends any ? T['type'] : never

export type SSMLElementType =
  | UnionTypesMap<Alias>
  | UnionTypesMap<Changespeed>
  | UnionTypesMap<Continuous>
  | UnionTypesMap<Digital>
  | UnionTypesMap<English>
  | UnionTypesMap<Mute>
  | UnionTypesMap<Read>
  | UnionTypesMap<Rhythm>
  | UnionTypesMap<Speaker>
  | UnionTypesMap<Special>
