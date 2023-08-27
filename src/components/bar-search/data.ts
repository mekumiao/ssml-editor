export interface BarSearchMenuItemLabel {
  default: string
  custom: string
  history: string
}

export type BarSearchMenuKey = keyof BarSearchMenuItemLabel

export interface BarSearchFilter {
  search: string
  menuKey: BarSearchMenuKey
  scene: string
  style: string
}
