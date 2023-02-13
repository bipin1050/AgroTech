import { useAuth, AuthProvider } from '../Authentication/auth'
import Displaybox from '../components/displaybox'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Products from '../components/products'
import Searchbar from '../components/searchbar'

const App = () => {

  const auth = useAuth();

  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default App
