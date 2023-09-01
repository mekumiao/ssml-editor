import { defaultContentData, type ContentData } from '@/menu/management-menu/data'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useManagementStore = defineStore('--editor-management-menu', () => {
  const contentData = reactive<ContentData>(defaultContentData())

  return { contentData }
})
