import $ from './dom'

export function playSound(src: string) {
  const borswer = window.navigator.userAgent.toLowerCase()
  if (borswer.indexOf('ie') >= 0) {
    //IE内核浏览器
    const strEmbed = `<embed name="embedPlay" src="${src}"></embed>`
    if ($('body').find('embed').length <= 0) $('body').append(strEmbed)
    //@ts-ignore
    const embed = document.embedPlay

    //浏览器不支持 audion，则使用 embed 播放
    embed.volume = 100
    //embed.play();这个不需要
  } else {
    //非IE内核浏览器
    const strAudio = `<audio id='audioPlay' src='${src}' hidden='true'>`
    if ($('body').find('audio').length <= 0) $('body').append(strAudio)
    const audio = document.getElementById('audioPlay')

    //浏览器支持 audion
    //@ts-ignore
    audio.play()
  }
}
