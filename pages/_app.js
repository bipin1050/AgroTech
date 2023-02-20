import { AuthProvider } from '../Authentication/auth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>)
}

export default MyApp
