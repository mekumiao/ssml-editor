import axios from 'axios'
import './mock-server'
import type { FilterSpeaker, LabelValue, Speaker } from '@/model'
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

export async function tag(): Promise<LabelValue[]> {
  const resp = await axios.get('/tag')
  return resp.data
}

export async function speaker(filter: FilterSpeaker): Promise<Speaker[]> {
  const resp = await axios.get('/speaker', { params: { ...filter } })
  return resp.data
}

export async function star(speaker: string, star: boolean): Promise<boolean> {
  const resp = await axios.get('/star', { params: { speaker, star } })
  return resp.data
}

export async function flag(flag: string): Promise<Speaker[]> {
  const resp = await axios.get('/flag', { params: { flag } })
  return resp.data
}
