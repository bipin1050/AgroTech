import type { NextPage } from 'next'
import Displaybox from '../components/displaybox'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Products from '../components/products'
import Searchbar from '../components/searchbar'

const App: NextPage = () => {
  return (
    <div>
        <Header />
        <div>
        <Searchbar />
          <div className='top-div flex justify-around'>
            <Displaybox />
          </div>
          <div className='products'>
            <Products />
          </div>

        </div>
        <Footer />
    </div>
  )
}

export default App