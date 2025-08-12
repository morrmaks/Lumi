import { BuildOptions } from './types/config'
import { Configuration as DevServerConfiguration } from 'webpack-dev-server'

export const buildDevServer = ({
  port,
}: BuildOptions): DevServerConfiguration => {
  return {
    port: port,
    compress: true,
    hot: true,
    open: true,
    historyApiFallback: {
      disableDotRule: true,
      index: '/index.html',
    },
  }
}
