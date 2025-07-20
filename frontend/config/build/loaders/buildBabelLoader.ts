import { BuildOptions } from '../types/config'
import { babelRemovePropsPlugin } from '../../babel/babelRemovePropsPlugin'

interface BabelLoaderProps extends BuildOptions {
  isJsx?: boolean
}

export const buildBabelLoader = ({ isDev, isJsx }: BabelLoaderProps) => {
  const isProd = !isDev

  return {
    test: isJsx ? /\.(jsx|tsx)$/i : /\.(js|ts)$/i,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ['@babel/preset-env'],
        plugins: [
          ['@babel/plugin-transform-typescript', { isJsx }],
          ['@babel/plugin-transform-runtime'],
          isJsx &&
            isProd && [babelRemovePropsPlugin, { props: ['data-testid'] }],
          isDev && require.resolve('react-refresh/babel'),
        ].filter(Boolean),
      },
    },
    exclude: /node_modules/,
  }
}
