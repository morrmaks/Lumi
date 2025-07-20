import { BuildOptions } from './types/config'
import webpack from 'webpack'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
  const { isDev } = options

  const fileLoader = {
    test: /\.(svg|png|webp|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/i,
    type: 'asset/resource',
  }

  const cssLoader = buildCssLoader(isDev)

  const babelLoader = buildBabelLoader({ ...options, isJsx: false })
  const jsxBabelLoader = buildBabelLoader({ ...options, isJsx: true })

  return [fileLoader, cssLoader, babelLoader, jsxBabelLoader]
}
