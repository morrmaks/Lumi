import { BuildOptions } from './types/config'
import webpack from 'webpack'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
  const { isDev } = options

  const fileLoader = {
    test: /\.(png|webp|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/i,
    type: 'asset/resource',
  }

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }

  const cssLoader = buildCssLoader(isDev)

  const babelLoader = buildBabelLoader({ ...options, isJsx: false })
  const jsxBabelLoader = buildBabelLoader({ ...options, isJsx: true })

  return [fileLoader, svgLoader, cssLoader, babelLoader, jsxBabelLoader]
}
