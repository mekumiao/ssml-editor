import axios from 'axios'
import './mock-server'
import type { LabelValue } from '@/model'
import type { BarSearchFilter } from '@/components/bar-search'

export async function pinyin(word: string): Promise<LabelValue[]> {
  const resp = await axios.get('/pinyin', { params: { word } })
  return resp.data
}

export async function english(word: string): Promise<LabelValue[]> {
  const resp = await axios.get('/english', { params: { word } })
  return resp.data
}

export async function bgm(filter: BarSearchFilter): Promise<LabelValue[]> {
  const resp = await axios.get('/bgm', { params: { ...filter } })
  return resp.data
}

export async function special(filter: BarSearchFilter): Promise<LabelValue[]> {
  const resp = await axios.get('/special', { params: { ...filter } })
  return resp.data
}

export async function scene(): Promise<LabelValue[]> {
  const resp = await axios.get('/scene')
  return resp.data
}

export async function style(): Promise<LabelValue[]> {
  const resp = await axios.get('/style')
  return resp.data
}
