// 休眠
export function sleep(timeoutMilliseconds: number = 0) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeoutMilliseconds)
  })
}
