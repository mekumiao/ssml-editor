import axios from 'axios'
import './mock-server'
import type { LabelValue } from '@/model'
import type { Filter } from '@/config'

export async function speaker(word: string): Promise<LabelValue[]> {
  const resp = await axios.get('/speaker', { params: { word } })
  return resp.data
}

export async function english(word: string): Promise<LabelValue[]> {
  const resp = await axios.get('/english', { params: { word } })
  return resp.data
}

export async function bgm(filter: Filter): Promise<LabelValue[]> {
  const resp = await axios.get('/bgm', { params: { ...filter } })
  return resp.data
}

export async function special(filter: Filter): Promise<LabelValue[]> {
  const resp = await axios.get('/special', { params: { ...filter } })
  return resp.data
}
