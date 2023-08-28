import type { LabelValue } from '@/model'

function format(n: number) {
  return `${((n - 1) * 100).toFixed(0)}%`
}

export const rates: LabelValue[] = [
  { value: format(0.5), label: '0.5x' },
  { value: format(0.55), label: '0.55x' },
  { value: format(0.6), label: '0.6x' },
  { value: format(0.65), label: '0.65x' },
  { value: format(0.7), label: '0.7x' },
  { value: format(0.75), label: '0.75x' },
  { value: format(0.8), label: '0.8x' },
  { value: format(0.85), label: '0.85x' },
  { value: format(0.9), label: '0.9x' },
  { value: format(0.95), label: '0.95x' },
  { value: format(1), label: '1x' },
  { value: format(1.05), label: '1.05x' },
  { value: format(1.1), label: '1.1x' },
  { value: format(1.15), label: '1.15x' },
  { value: format(1.2), label: '1.2x' },
  { value: format(1.25), label: '1.25x' },
  { value: format(1.3), label: '1.3x' },
  { value: format(1.35), label: '1.35x' },
  { value: format(1.4), label: '1.4x' },
  { value: format(1.45), label: '1.45x' },
  { value: format(1.5), label: '1.5x' },
  { value: format(1.55), label: '1.55x' },
  { value: format(1.6), label: '1.6x' },
  { value: format(1.65), label: '1.65x' },
  { value: format(1.7), label: '1.7x' },
  { value: format(1.75), label: '1.75x' },
  { value: format(1.8), label: '1.8x' },
  { value: format(1.85), label: '1.85x' },
  { value: format(1.9), label: '1.9x' },
  { value: format(1.95), label: '1.95x' },
  { value: format(2), label: '2x' },
]
