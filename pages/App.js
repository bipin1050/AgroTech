import Displaybox from '../components/displaybox'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Products from '../components/products'
import Searchbar from '../components/searchbar'

const App = () => {
  return (
      <div>
        <Header />
        <div className='px-16'>
          <div className='flex justify-end pt-3'>
            <Searchbar />
          </div>
          <div >
            <div className=''>
              <Displaybox />
            </div>
            <div className='products'>
              <Products />
            </div>
          </div>
        </div>
        <Footer />
      </div>
  )
}

export default App
