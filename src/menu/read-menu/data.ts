export const readList = [
  { label: '重音', value: 'z' },
  { label: '拖音', value: 't' },
  { label: '重音+拖音', value: 'z+t' },
] as const

export type ReadLabelValue = { value: (typeof readList)[number]['value']; label: string }
