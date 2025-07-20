import { ResolveOptions } from 'webpack'
import { BuildOptions } from './types/config'

export const buildResolvers = ({ paths }: BuildOptions): ResolveOptions => {
  return {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    modules: [paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {
      '@': paths.src,
    },
  }
}
