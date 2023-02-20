import App from './App'
import Head from 'next/head'
import { useAuth, AuthProvider } from '../Authentication/auth'

const Home = () => {
  return (
      <div>
        <Head>
          <title>Agro-Tech</title>
          <meta name="description" content="Agro tech - shop fresh here" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <App/>
        </main>
      </div>
  )
}

export default Home
