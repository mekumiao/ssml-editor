import { defineComponent } from 'vue'
import SearchInput from './search-input.vue'
import SearchContent from './search-content.vue'

type G = { id: string; text: string; value: string }

export type BarSearchData = G[] & { items: G[] }

export default defineComponent({
  setup() {
    return () => (
      <div>
        <SearchInput></SearchInput>
        <SearchContent></SearchContent>
      </div>
    )
  }
})
