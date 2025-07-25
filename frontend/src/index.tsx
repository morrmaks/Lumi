import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@/app/styles/index.less'
import { App } from './app/App'
import { ThemeProvider } from './app/providers/ThemeProvider'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Корневой элемент не найден')
}
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
