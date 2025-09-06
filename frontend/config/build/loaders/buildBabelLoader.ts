import { BuildOptions } from '../types/config'
import { babelRemovePropsPlugin } from '../../babel/babelRemovePropsPlugin'

interface BabelLoaderProps extends BuildOptions {
  isTsx?: boolean
}

export const buildBabelLoader = ({ isDev, isTsx }: BabelLoaderProps) => {
  const isProd = !isDev

  return {
    test: isTsx ? /\.(jsx|tsx)$/i : /\.(js|ts)$/i,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ['@babel/preset-env'],
        plugins: [
          ['@babel/plugin-transform-typescript', { isTsx }],
          ['@babel/plugin-transform-runtime'],
          isTsx &&
            isProd && [babelRemovePropsPlugin, { props: ['data-testid'] }],
          isDev && require.resolve('react-refresh/babel'),
        ].filter(Boolean),
      },
    },
  }
}
