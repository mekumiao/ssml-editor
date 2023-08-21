import axios from 'axios'
import './mockServer'

export function speaker(word: string): Promise<LabelValue[]> {
  return axios.get('/speaker', { params: { word } })
}

export function english(word: string): Promise<LabelValue[]> {
  return axios.get('/english', { params: { word } })
}
