import type { NextPage } from 'next'
import Footer from '../components/Footer'
import Header from '../components/Header'

const App: NextPage = () => {
  return (
    <div>
        <Header />
        <div>
          <div className='top-div flex justify-around'>
            <div className='category'>
              category here
            </div>
            <div className='slider'>
              image slider here
            </div>
          </div>
          <div className='products'>
            Products here
          </div>

        </div>
        <Footer />
    </div>
  )
}

export default App