/**
 * 休眠
 * @param timeoutMilliseconds 休眠的时间.单位毫秒
 * @returns
 */
export function sleep(timeoutMilliseconds: number = 0) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeoutMilliseconds)
  })
}
