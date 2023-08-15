import xmlFormat from 'xml-formatter'

export function formatXML(xml: string) {
  const res = xmlFormat(xml, {
    indentation: '    ',
    filter: (node) => node.type !== 'Comment',
    collapseContent: false,
    lineSeparator: '\n'
  })
  return res
}
