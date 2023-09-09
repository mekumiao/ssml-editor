// 休眠
export function sleep(timeoutMilliseconds: number = 1000) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeoutMilliseconds)
  })
}
