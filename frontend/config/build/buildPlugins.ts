import { BuildOptions } from './types/config'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { config } from 'dotenv'

export const buildPlugins = ({
  isDev,
  paths,
}: BuildOptions): webpack.WebpackPluginInstance[] => {
  const isProd = !isDev

  let env = {}
  const envFiles = [paths.envStack, paths.envFile]

  envFiles.forEach((file) => {
    const parsed = config({ path: file }).parsed || {}
    env = { ...env, ...parsed }
  })

  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env.BASE_API': JSON.stringify(process.env.BASE_API),
      'process.env.YA_SUGGEST_API_KEY': JSON.stringify(
        process.env.YA_SUGGEST_API_KEY
      ),
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
  ]

  if (isDev) {
    plugins.push(new ReactRefreshPlugin())
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      })
    )
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    )
  }

  return plugins
}
