import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  type ProvideMap = {
    'box-editor-view': Ref<HTMLDivElement | undefined>
  }
  function provide<K extends keyof ProvideMap>(key: K, value: ProvideMap[K]): void
  function inject<K extends keyof ProvideMap>(key: K): ProvideMap[K] | undefined
}
