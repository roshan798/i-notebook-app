import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './CSS/main.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { NotificationProvider } from './contexts/NotificationContext.tsx'
import { ThemeProvider } from './contexts/themeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider>
                    <NotificationProvider>
                        <App />
                    </NotificationProvider>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
