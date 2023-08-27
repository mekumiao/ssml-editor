export type BarSearchMenuKey = 'default' | 'custom' | 'history'
export type BarSearchMenuItemLabel = { [k in BarSearchMenuKey]: string }
export interface BarSearchFilter {
  search: string
  menuKey: BarSearchMenuKey
  scene: string
  style: string
}
