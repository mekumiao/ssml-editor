import $, {
  append,
  on,
  focus,
  attr,
  val,
  html,
  dataset,
  addClass,
  removeClass,
  children,
  each,
  find,
  hide,
  click,
  off,
  is,
  parents,
} from 'dom7'

if (hide) $.fn.hide = hide
if (append) $.fn.append = append
if (click) $.fn.click = click
if (on) $.fn.on = on
if (off) $.fn.off = off

if (focus) $.fn.focus = focus
if (attr) $.fn.attr = attr
if (val) $.fn.val = val
if (html) $.fn.html = html
if (dataset) $.fn.dataset = dataset
if (addClass) $.fn.addClass = addClass
if (removeClass) $.fn.removeClass = removeClass
if (children) $.fn.children = children
if (each) $.fn.each = each
if (find) $.fn.find = find
if (is) $.fn.is = is
if (parents) $.fn.parents = parents

export { type Dom7Array } from 'dom7'
export default $

import DOMNode = globalThis.Node
import DOMComment = globalThis.Comment
import DOMElement = globalThis.Element
import DOMText = globalThis.Text
import DOMRange = globalThis.Range
import DOMSelection = globalThis.Selection
import DOMStaticRange = globalThis.StaticRange
export { DOMNode, DOMComment, DOMElement, DOMText, DOMRange, DOMSelection, DOMStaticRange }
