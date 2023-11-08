import type { PartialSSMLEditorConfig } from '@/config'
import { english, bgm, special, scene, style, tag, speaker, star } from './api'
import { upload, transfer, conversionSpeaker, play, saveHtml, readHtml } from './api'
import { fetchRecentUsage, deleteRecentUsage, recordRecentUsage } from './api'
import { ElMessage, ElNotification } from 'element-plus'
import type { Speaker } from '@/model'
import { emitter } from '@/event-bus'
import { h } from 'vue'
import { defaultAvatar } from '@/config'

emitter.on('tryplay-speaker-detail-show', (speaker) => {
  ElNotification.info({
    title: '配音师详情',
    message: h('div', [
      h('img', { src: speaker.avatar || defaultAvatar(), height: 60, width: 60 }),
      h('h4', [h('span', 'ID: '), h('span', speaker.name)]),
      h('h4', [h('span', '名称: '), h('span', speaker.displayName)]),
    ]),
  })
})

async function selectSpeaker(speaker: Speaker, setter: (speaker: Speaker) => void) {
  if (!speaker.isFree) {
    ElMessage.warning({ message: '模拟会员独享功能', grouping: true })
    setter(speaker)
  } else {
    setter(speaker)
  }
}

export default <PartialSSMLEditorConfig>{
  animation: { grayscale: false, zoom: true },
  editorConfig: { saveHtml: saveHtml, readHtml: readHtml },
  handleWarn: (message) => {
    ElMessage.warning({ message: message, grouping: true })
  },
  // 错误处理
  handleError: (error) => {
    if (typeof error === 'string') {
      ElMessage.error({ message: error, grouping: true })
    } else if (error instanceof Error) {
      ElMessage.error({ message: error.message, grouping: true })
    } else {
      console.error(error)
    }
  },
  // 音标菜单请求音标用
  english: { fetchData: english },
  // 配乐菜单 搜索,切换选项卡时请求数据用
  bgm: { fetchData: bgm, fetchScene: scene, fetchStyle: style },
  // 音效菜单 搜索,切换选项卡时请求数据用
  special: { fetchData: special, fetchScene: scene, fetchStyle: style },
  // 试听面板 数据结构和其他配置(支持自定义配音师类别,性别,等数据)
  tryPlay: {
    featchTag: tag,
    fetchData: speaker,
    fetchStar: star,
    play: play,
    selectSpeaker: selectSpeaker,
  },
  // 局部变音
  conversion: {
    // 文件上传超时时间
    timeoutMilliseconds: 20000,
    // 上传音频文件
    audioUpload: upload,
    // 将上传的音频文件转换为指定配音师音色的接口
    transfer: transfer,
    // 请求支持 transfer 接口的配音师列表数据
    fetchSpeaker: conversionSpeaker,
  },
  // 多人配音
  management: {
    // 获取最近使用接口
    fetchRecentUsage: fetchRecentUsage,
    // 删除或清空最近使用接口
    deleteRecentUsage: deleteRecentUsage,
    // 记录最近使用接口
    recordRecentUsage: recordRecentUsage,
  },
}
