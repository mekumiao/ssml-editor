import InsertPolyphone from './InsertPolyphone'
import InsertContinuous from './InsertContinuous'

export const insertPolyphoneConf = {
  key: 'insertPolyphone',
  factory() {
    return new InsertPolyphone()
  }
}

export const insertContinuousConf = {
  key: 'insertContinuous',
  factory() {
    return new InsertContinuous()
  }
}
