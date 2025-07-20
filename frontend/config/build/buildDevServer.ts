import { BuildOptions } from './types/config'
import { Configuration as DevServerConfiguration } from 'webpack-dev-server'

export const buildDevServer = ({
  port,
}: BuildOptions): DevServerConfiguration => {
  return {
    // static: path.resolve(__dirname,'./dist'),
    port: port,
    compress: true,
    hot: true,
    open: true,
  }
}
