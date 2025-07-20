import webpack from 'webpack'
import { BuildOptions } from './types/config'
import { buildDevServer } from './buildDevServer'
import { buildPlugins } from './buildPlugins'
import { buildLoaders } from './buildLoaders'
import { buildResolvers } from './buildResolvers'

export const buildWebpackConfig = (
  options: BuildOptions
): webpack.Configuration => {
  const { mode, paths, isDev } = options

  return {
    mode: mode,
    entry: paths.entry,
    output: {
      path: paths.build,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    devServer: isDev ? buildDevServer(options) : undefined,
    devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    module: {
      rules: buildLoaders(options),
    },
    plugins: buildPlugins(options),
    resolve: buildResolvers(options),
    optimization: {
      minimize: !isDev,
    },
  }
}
