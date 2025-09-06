import * as path from 'path'
import { BuildEnv, BuildPaths } from './config/build/types/config'
import * as webpack from 'webpack'
import { buildWebpackConfig } from './config/build/buildWebpackConfig'

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    favicon: path.resolve(__dirname, 'public', 'favicon-32x32.png'),
    src: path.resolve(__dirname, 'src'),
    envStack: path.resolve(
      __dirname,
      env.mode === 'development' ? '.env.development' : '.env.production'
    ),
    envFile: path.resolve(__dirname, '.env'),
  }

  const mode = env?.mode ?? 'development'
  const port = env?.port ?? 3000
  const isDev = mode === 'development'

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    isDev,
    port,
    paths,
  })

  return config
}
