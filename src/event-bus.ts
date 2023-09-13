import ee from 'event-emitter'
import { EMITTER_EVENT } from './constant'
import { getConfig } from './config'

const emitter = ee()

export { emitter }

emitter.on(EMITTER_EVENT.EDITOR_CREATED, () => {
  const config = getConfig()
  if (config.effects.zoom) {
    document.querySelector('.w-e-text-container')?.classList.add('allow-zoom')
  }
  if (config.effects.grayscale) {
    document.querySelector('.w-e-text-container')?.classList.add('allow-grayscale')
  }
})
