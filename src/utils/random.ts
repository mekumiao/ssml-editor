import { nanoid } from 'nanoid'

export function genRandomStr(prefix: string = 'r'): string {
  return `${prefix}-${nanoid()}`
}
