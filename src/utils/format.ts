export function formatXML(xml: string, tab?: string) {
  let formatted = ''
  let indent = ''
  tab = tab || '    '
  xml.split(/>\s*</).forEach(function (node: string) {
    if (node.match(/^\/\w/)) indent = indent.substring(tab!.length)
    formatted += indent + '<' + node + '>\r\n'
    if (node.match(/^<?\w[^>]*[^\\/]$/)) indent += tab
  })
  return formatted.substring(1, formatted.length - 3)
}
