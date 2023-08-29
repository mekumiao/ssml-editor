export const readList = [
  { label: '重音', value: 'z' },
  { label: '拖音', value: 't' },
  { label: '重音+拖音', value: 'z+t' },
] as const

export const readValueMap = {
  z: { pitch: 'x-high', rate: undefined },
  t: { pitch: undefined, rate: 'medium' },
  'z+t': { pitch: 'x-high', rate: 'medium' },
}

export type ReadLabelValue = { value: (typeof readList)[number]['value']; label: string }
