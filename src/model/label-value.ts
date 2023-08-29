export interface LabelValue {
  label: string
  value: string
}

export function defaultLabelValue(): LabelValue {
  return { label: '', value: '' }
}
