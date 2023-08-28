export const readList = [
  { label: '重音', value: 'z' },
  { label: '拖音', value: 't' },
  { label: '重音+拖音', value: 'z+t' },
] as const

export const readValueMap = {
  z: { pitch: '+100%', rate: undefined },
  t: { pitch: undefined, rate: '-100%' },
  'z+t': { pitch: '+100%', rate: '-100%' },
}

export type ReadLabelValue = { value: (typeof readList)[number]['value']; label: string }
