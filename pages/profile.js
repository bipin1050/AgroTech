// import axios from 'axios'
// import Head from 'next/head'
// import Image from 'next/image'
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import logo from '../assets/img/logo.png'
// import { useAuth } from '../Authentication/auth';
// import Header from '../components/Header';

// export default function ProfilePage() {

//   const [name, setName] = useState(null);
//   const [role, setRole] = useState(null);
//   const [email, setEmail] = useState(null);


//   useEffect(()=>{
//     localStorage.getItem("accessToken") && axios.post("http://localhost:8000/user/isLogin", {
//     headers: {
//         'authorization': `${localStorage.getItem("accessToken")}` 
//     }
//     })
//     .then((res)=>{
//         // console.log(res)
//         setEmail(res.data.email);
//         setName(res.data.name);
//         setRole(res.data.role)
//     })
//     .catch((err)=>{
        
//     })
//   },[])

//   const auth = useAuth();
//   const router = useRouter();

//   const handleLogout = () => {
//       auth.logout();
//       router.push('/');
//       console.log('oushed')
//   }
//   if(!auth.loggedIn){
//     router.push('/')
//   }

//   const [addProduct, setAddProduct] = useState(false);
//   const [viewProduct, setViewProduct] = useState(false);
//   const [viewCart, setViewCart] = useState(false);



//   const handleAddProduct = () => {
//     addProduct ? setAddProduct(false) : setAddProduct(true)
//   }

//   const handleViewProduct = () => {
//     viewProduct ? setViewProduct(false) : setViewProduct(true)

//     viewProduct && 
//     axios.get("http://localhost:8000/plans/allPlans")
//     .then((res)=>{
//       setProducts(res.data.data)
//       // console.log(res.data.data)
//     }).catch(()=>{
//         console.log("Error while fetching products form the server")
//     })
//   }

//   const handleViewCart = () => {
//     viewCart ? setViewCart(false) : setViewCart(true)
//   }

//   const [newProduct, setNewProduct] = useState({ name: "", duration: "", price: "", discount:"", description : ""});
  
//   const handleChange = e => {
//       const { name, value } = e.target;
//       setNewProduct(prevState => ({
//           ...prevState,
//           [name]: value
//       }));
//   };
  

//   const handleSubmitProduct = event => {
//     event.preventDefault();
//     axios.post('http://localhost:8000/plans/crudPlan',{
//       name : "Grapes",
//       price : 100,
//       duration : 30,
//       discount : 30
//     }).then(()=> {
//       console.log('data sent')
//     }).catch((err) => {
//       console.log(err)
//     })
//     // console.log(newProduct)
//   }

//   return (
//     <>
//       <Head>
//         <title>Profile Page | Agro App</title>
//         <meta name="description" content="Profile Page for Agro App" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Header />
      
//       <main className="bg-gray-100 min-h-screen">
//         <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:py-16 lg:px-8">
//           <div className="max-w-3xl mx-auto">
//             <h1 className="text-3xl font-extrabold text-gray-900">{name}</h1>
//             <div className="mt-4">
//               <Image
//                 src={logo}
//                 alt="User Profile Picture"
//                 width={200}
//                 height={200}
//                 className="rounded-full"
//               />
//             </div>
//             <section className="mt-8">
//               <h1 className="text-3xl font-extrabold text-gray-900">{email}</h1>
//               <h1 className="text-3xl font-extrabold text-gray-900">You are currently a {role}</h1>
//             </section>
//             <button onClick={handleLogout}>Logout</button>

//             {auth.role == 'retailer'
//             &&
//             (
//               <div>
//                 <button onClick={handleViewCart}> {/* button for add product*/}
//                   View Cart
//                 </button>
//                 {viewCart &&(
//                   <div>
//                     Cart Viewed
//                   </div>
//                 )}  
//               </div>
//             )}

//             {auth.role == 'farmer' 
//             && 
//             (<div  className=''> {/* div to add product in the farmer list*/}
//                 <button onClick={handleAddProduct}> {/* button for add product*/}
//                   Add Entries
//                 </button>
//                 {addProduct && 
//                 (<div>
//                   <form onSubmit={handleSubmitProduct}>
//                     <li>Name</li>
//                     <input
//                         value={newProduct.name}
//                         placeholder = {'Apple'}
//                         type="text"
//                         onChange={handleChange}
//                         name="name"
//                       />
//                     <li>Life Time</li>
//                     <input
//                         value={newProduct.duration}
//                         placeholder = {'30'}
//                         type="text"
//                         onChange={handleChange}
//                         name="duration"
//                       />
//                     <li>Price</li>
//                     <input
//                         value={newProduct.price}
//                         placeholder = {'350'}
//                         type="text"
//                         onChange={handleChange}
//                         name="price"
//                       />
//                     <li>Discount</li>
//                     <input
//                         value={newProduct.discount}
//                         placeholder = {'10'}
//                         type="text"
//                         onChange={handleChange}
//                         name="discount"
//                       />
//                     <li>Description</li>
//                     <input
//                         value={newProduct.description}
//                         placeholder = {'best apple from Helambu'}
//                         type="text"
//                         onChange={handleChange}
//                         name="description"
//                       />
//                     <button type='submit'>Submit</button>
//                   </form>
//                 </div>)}
//                 <button onClick={handleViewProduct}> {/* button for view product*/}
//                   View Entries
//                 </button>
//                 {viewProduct &&
//                 (
//                   <div>
//                     view button clicked
//                   </div>
//                 )}
//             </div>)}
//           </div>
//         </div>
//       </main>
//     </>
//   )
// }


import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import logo from '../assets/img/logo.png'
import { useAuth } from '../Authentication/auth';
import Header from '../components/Header';

export default function ProfilePage() {

  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);


  useEffect(()=>{
    localStorage.getItem("accessToken") && axios.post("http://localhost:8000/user/isLogin", {
    headers: {
        'authorization': `${localStorage.getItem("accessToken")}` 
    }
    })
    .then((res)=>{
        // console.log(res)
        setEmail(res.data.email);
        setName(res.data.name);
        setRole(res.data.role)
    })
    .catch((err)=>{
        
    })
  },[])

  const auth = useAuth();
  const router = useRouter();

  const handleLogout = () => {
      auth.logout();
      router.push('/');
      console.log('oushed')
  }
  if(!auth.loggedIn){
    router.push('/')
  }

  const [addProduct, setAddProduct] = useState(false);
  const [viewProduct, setViewProduct] = useState(false);
  const [viewCart, setViewCart] = useState(false);



  const handleAddProduct = () => {
    addProduct ? setAddProduct(false) : setAddProduct(true)
  }

  const handleViewProduct = () => {
    viewProduct ? setViewProduct(false) : setViewProduct(true)

    viewProduct && 
    axios.post("http://localhost:8000/plans/crudPlan/farmer", {
      headers : {
        'authorization': `${localStorage.getItem("accessToken")}` 
      }
    })
    .then((res)=>{
      setViewProduct(res.data.data)
      console.log(res.data.data)
    }).catch((err)=>{
      
        // console.log("Error while fetching products form the server")
        console.log(err)
    })
  }

  const handleViewCart = () => {
    viewCart ? setViewCart(false) : setViewCart(true)
  }

  const [newProduct, setNewProduct] = useState({ name: "", duration: "", price: "", discount:"", description : ""});
  
  const handleChange = e => {
      const { name, value } = e.target;
      setNewProduct(prevState => ({
          ...prevState,
          [name]: value
      }));
  };
  

  const handleSubmitProduct = event => {
    event.preventDefault();
    console.log(newProduct)
    axios.post('http://localhost:8000/plans/crudPlan',{
      headers : {
        'authorization' : `${localStorage.getItem("accessToken")}`
      },
      name : newProduct.name,
      duration : newProduct.duration,
      price : newProduct.price,
      discount : newProduct.discount,
      description : newProduct.description
    }).then(()=> {
      // console.log('data sent')
      newProduct.name = "";
      newProduct.duration = "";
      newProduct.price = "";
      newProduct.discount = "";
      newProduct.description = "";
    }).catch((err) => {
      console.log(err)
    })
    // console.log(newProduct)
  }

  return (
    <>
      <Head>
        <title>Profile Page | Agro App</title>
        <meta name="description" content="Profile Page for Agro App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900">{name}</h1>
            <div className="mt-4">
              <Image
                src={logo}
                alt="User Profile Picture"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
            <section className="mt-8">
              <h1 className="text-3xl font-extrabold text-gray-900">{email}</h1>
              <h1 className="text-3xl font-extrabold text-gray-900">You are currently a {role}</h1>
            </section>
            <button onClick={handleLogout}>Logout</button>

            {auth.role == 'retailer'
            &&
            (
              <div>
                <button onClick={handleViewCart}> {/* button for add product*/}
                  View Cart
                </button>
                {viewCart &&(
                  <div>
                    Cart Viewed
                  </div>
                )}  
              </div>
            )}

            {auth.role == 'farmer' 
            && 
            (<div  className=''> {/* div to add product in the farmer list*/}
                <button onClick={handleAddProduct}> {/* button for add product*/}
                  Add Entries
                </button>
                {addProduct && 
                (<div>
                  <form onSubmit={handleSubmitProduct}>
                    <li>Name</li>
                    <input
                        value={newProduct.name}
                        placeholder = {'Apple'}
                        type="text"
                        onChange={handleChange}
                        name="name"
                      />
                    <li>Life Time</li>
                    <input
                        value={newProduct.duration}
                        placeholder = {'30'}
                        type="text"
                        onChange={handleChange}
                        name="duration"
                      />
                    <li>Price</li>
                    <input
                        value={newProduct.price}
                        placeholder = {'350'}
                        type="text"
                        onChange={handleChange}
                        name="price"
                      />
                    <li>Discount</li>
                    <input
                        value={newProduct.discount}
                        placeholder = {'10'}
                        type="text"
                        onChange={handleChange}
                        name="discount"
                      />
                    <li>Description</li>
                    <input
                        value={newProduct.description}
                        placeholder = {'best apple from Helambu'}
                        type="text"
                        onChange={handleChange}
                        name="description"
                      />
                    <button type='submit'>Submit</button>
                  </form>
                </div>)}
                <button onClick={handleViewProduct}> {/* button for view product*/}
                  View Entries
                </button>
                {viewProduct &&
                (
                  <div>
                    {viewProduct}
                  </div>
                )}
            </div>)}
          </div>
        </div>
      </main>
    </>
  )
}