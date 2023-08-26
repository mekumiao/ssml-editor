import { type ConfigEnv } from 'vite'
import { loadEnv } from 'vite'

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())

  if (mode === 'development') {
    return require('./vite.config.dev').default(env)
  } else {
    return require('./vite.config.prod').default(env)
  }
}
