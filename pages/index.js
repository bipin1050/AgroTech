import App from './App'
import Head from 'next/head'

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
