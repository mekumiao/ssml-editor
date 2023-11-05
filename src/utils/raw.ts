export function exportRaw(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.setAttribute('download', filename)
  link.setAttribute('href', url)

  document.body.appendChild(link)
  link.click()

  URL.revokeObjectURL(url)
}
