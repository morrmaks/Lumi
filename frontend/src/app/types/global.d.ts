declare module '*.less' {
  interface IClassNames {
    [className: string]: string
  }

  const classes: IClassNames
  export default classes
}

declare module '*.svg' {
  import React from 'react'

  const SVG: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

type OptionalRecord<K extends PropertyKey, T> = { [P in K]?: T }
