import type { LabelValue } from '@/model'

export const speed = () => {
  const list: LabelValue[] = []
  for (let start = 2; start <= 40; start++) {
    const item = (start * 0.05).toFixed(2)
    list.push({ value: item, label: `${item}x` })
  }
  return list
}

export const pitch = () => {
  const list: LabelValue[] = []
  for (let start = -10; start <= 10; start++) {
    list.push({ value: start.toString(), label: start.toString() })
  }
  return list
}
