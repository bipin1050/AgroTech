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
<<<<<<< HEAD
       
          <div className='flex justify-end pt-3'>
        <Searchbar />

        </div>
        <div >
          <div className='top-div flex justify-around'>
            <Displaybox />
          </div>
          <div className='products px-[5%]'>
=======
        <div>
        <Searchbar />
          <div className='top-div flex justify-around'>
            <Displaybox />
          </div>
          <div className='products'>
>>>>>>> f356110e54f6878cf9bcef50ad16c20a6402f858
            <Products />
          </div>

        </div>
        <Footer />
    </div>
  )
}

export default App