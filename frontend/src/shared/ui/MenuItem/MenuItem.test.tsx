import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { MenuItem } from './MenuItem'
import { IconsMap } from '@/shared/consts'
import { slideMenuReducer } from '@/entities/SlideMenu'

const store = configureStore({
  reducer: {
    slideMenu: slideMenuReducer,
  },
})

describe('MenuItem', () => {
  it('рендерится с текстом и без Svg', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MenuItem to="/test">Test</MenuItem>
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('рендерится с Svg', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MenuItem to="/test" Svg={IconsMap.PHOTO}>
            Test
          </MenuItem>
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByTestId('svg-icon')).toBeInTheDocument()
  })

  it('вызывает navigate при клике', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MenuItem to="/test">Test</MenuItem>
        </MemoryRouter>
      </Provider>
    )

    const item = screen.getByText('Test')
    fireEvent.click(item)

    const state = store.getState().slideMenu
    expect(state.isOpen).toBe(false)
  })
})
