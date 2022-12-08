import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Providers } from '../contexts/Providers'

export default function App ({ Component, pageProps }: AppProps) {
  const mdTheme = createTheme()

  return (
    <ThemeProvider theme={mdTheme}>
      <Providers>
        <CssBaseline />
        <Component {...pageProps} />
      </Providers>
    </ThemeProvider>
  )
}
