import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './context/UserContext'
import theme from './theme/createTheme'
import { ThemeProvider } from '@mui/material/styles'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
        <UserProvider>
            <App />
        </UserProvider>
    </ThemeProvider>
  </StrictMode>,
)
