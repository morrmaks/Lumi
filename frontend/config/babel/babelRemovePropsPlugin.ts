import { PluginItem } from '@babel/core'

export const babelRemovePropsPlugin = (): PluginItem => {
  return {
    visitor: {
      Program(path, state) {
        const forbidden = state.opts.props || []
        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name
            if (forbidden.includes(nodeName)) {
              current.parentPath.remove()
            }
          },
        })
      },
    },
  }
}
