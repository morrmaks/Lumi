import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const buildCssLoader = (isDev: boolean) => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      esModule: false,
      modules: {
        auto: /\.module\.(less|css)$/i,
        localIdentName: isDev
          ? '[path][name]__[local]--[hash:base64:5]'
          : '[hash:base64:8]',
        exportLocalsConvention: 'asIs',
      },
    },
  }

  return {
    test: /\.(css|less)$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoader,
      'postcss-loader',
      'less-loader',
    ],
  }
}
