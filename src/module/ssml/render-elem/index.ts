import renderContinuous from './renderContinuous'
import renderPlyphone from './renderPlyphone'
import './style.scss'

export const renderContinuousConf = {
  type: 'continuous',
  renderElem: renderContinuous
}

export const renderPlyphoneConf = {
  type: 'polyphone',
  renderElem: renderPlyphone
}
