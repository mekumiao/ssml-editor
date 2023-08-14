import {
  Boot,
  SlateEditor,
  DomEditor,
  SlateTransforms,
  SlateNode,
  SlateText,
  SlateRange
} from '@wangeditor/editor'
import module from './ssml'

window.SlateEditor = SlateEditor
window.SlateNode = SlateNode
window.SlateText = SlateText
window.DomEditor = DomEditor
window.SlateTransforms = SlateTransforms
window.SlateRange = SlateRange

Boot.registerModule(module)
