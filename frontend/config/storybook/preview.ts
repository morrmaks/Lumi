import { createElement } from 'react'
import { StoreProvider } from '../../src/app/providers/StoreProvider'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

export const withRouter = (Story) => {
  return createElement(
    MemoryRouter,
    { initialEntries: ['/catalog/categoryId/productId'] },
    createElement(
      Routes,
      null,
      createElement(Route, {
        path: '/catalog/:categoryId/:productId',
        element: createElement(Story),
      })
    )
  )
}

const withRedux = (Story, context) => {
  const initialState =
    context.parameters.initialState || context.globals.initialState || {}
  return createElement(
    StoreProvider,
    { initialState },
    createElement(Story, context)
  )
}

const withTheme = (Story, context) => {
  const theme = context.globals.theme || 'theme_light'
  const html = document.documentElement
  html.classList.remove('theme_light', 'theme_dark')
  html.classList.add(theme)

  const canvas = document.querySelector('.sb-show-main') as HTMLElement
  if (canvas) {
    canvas.style.backgroundColor =
      getComputedStyle(html).getPropertyValue('--bg-color')
  }

  return createElement(Story, context)
}

const modalRoot = document.createElement('div')
modalRoot.id = 'modal'
document.body.appendChild(modalRoot)

export const decorators = [withRouter, withRedux, withTheme]

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'theme_light',
    toolbar: {
      icon: 'circlehollow',
      items: ['theme_light', 'theme_dark'],
    },
  },
}

export const parameters = {
  // layout: 'centered',
}
