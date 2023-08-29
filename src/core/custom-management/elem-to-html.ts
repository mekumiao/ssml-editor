import type { SlateElement } from '@wangeditor/editor'
import type { CustomManagement } from './custom-types'

export default {
  type: 'custom-management',
  elemToHtml: (elem: SlateElement, childrenHtml: string) => {
    const { remark, style, role, name, pitch, rate } = elem as CustomManagement
    const html = `<span
          data-w-e-type="custom-management"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-style="${style}"
          data-ow-name="${name}"
          data-ow-role="${role}"
          data-ow-pitch="${pitch}"
          data-ow-rate="${rate}"
        >${childrenHtml}</span>`
    return html
  },
}
