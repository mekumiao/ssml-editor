import { speaker, english } from './api'
import { ElMessage } from 'element-plus'

export default {
  handleError: (error) => ElMessage.warning(error),
  fetchSpeaker: speaker,
  fetchEnglish: english
} as SSMLEditorConfig
