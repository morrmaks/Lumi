import path from 'path'

export default {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@storybook/addon-interactions',
    'storybook-addon-remix-react-router',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg')
    )
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    config.module.rules.push({
      test: /\.(css|less)$/i,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            esModule: false,
            modules: {
              auto: /\.module\.(less|css)$/i,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              exportLocalsConvention: 'asIs',
            },
          },
        },
        'postcss-loader',
        'less-loader',
      ],
    })

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      ],
      exclude: /node_modules/,
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../src'),
    }

    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
}
