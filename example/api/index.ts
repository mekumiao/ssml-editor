import axios from 'axios'
import './mockServer'
import type { LabelValue } from '@/model'

export async function speaker(word: string): Promise<LabelValue[]> {
  const resp = await axios.get('/speaker', { params: { word } })
  return resp.data
}

export async function english(word: string): Promise<LabelValue[]> {
  const resp = await axios.get('/english', { params: { word } })
  return resp.data
}
