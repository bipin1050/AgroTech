import axios from "axios";
import Head from "next/head";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import profile_picture from "../assets/img/profile.png";
import { AuthContext } from "../Authentication/auth";
import Header from "../components/Header";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { toast } from "react-toastify";

import FarmerPage from "../components/profileComp/farmer";
import TruckerPage from "../components/profileComp/trucker";
import AdminPage from "../components/profileComp/admin";
import { RequireAuth } from "../Authentication/RequireAuth";
import UserPage from "../components/profileComp/user";

function ProfilePage() {
  const router = useRouter();

  const { user, isLoading, logout } = useContext(AuthContext);

  // Redirect the user to the login page if they are not logged in
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!user) {
    router.push("/login");
    return null;
  }

  const handleLogout = async () => {
    router.push("/");
    await logout();
  };

  //profile picture edit
  const [showEditIcon, setShowEditIcon] = useState(false);

  const handleMouseEnter = () => {
    setShowEditIcon(true);
  };
  const handleMouseLeave = () => {
    setShowEditIcon(false);
  };

  const [addProduct, setAddProduct] = useState(false);
  const [viewProduct, setViewProduct] = useState(false);

  const [productHistory, setProductHistory] = useState(false);

  const handleViewProduct = () => {
    viewProduct ? setViewProduct(false) : setViewProduct(true);
    getProducts();
  };

  const [predictedPrice, setPredictedPrice] = useState(0);

  //for retailer/wholeseller product history



  const [isAssign, setIsAssign] = useState(false); //is Unassigned button clicked
  const [unAssignProduct, setUnAssignProduct] = useState([]); //list of items to be assigned to trucker for disptach from farm
  


  // const [isDispatched, setIsDispatched] = useState(true);


  const [checkCountAgrotech, setCheckCountAgrotech] = useState(0);
  const [checkCountAgrotechDispatch, setCheckCountAgrotechDispatch] =
    useState(0);
  const [checkCountDelivered, setCheckCountDelivered] = useState(0);
  const [isAssignProducts, setAssignProduct] = useState(true);
  const handleAssignProduct = () => {};

  //fetching unassigned list of product (i.e, just bought by customers)
  const handleUnAssignProduct = () => {
    isAssign ? setIsAssign(false) : setIsAssign(true);

    axios
      .post("http://localhost:8000/status/seeProductStatus", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setUnAssignProduct(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  const [isFarmDispatch, setIsFarmDispatch] = useState(false);
  const [farmDispatched, setFarmDispatched] = useState([]);
  const [checkCountFarmDispatch, setCheckCountFarmDispatch] = useState(0);

  const handleFarmDispatch = () => {
    isFarmDispatch ? setIsFarmDispatch(false) : setIsFarmDispatch(true);

    axios
      .post("http://localhost:8000/status/seeProductDispatchedFromFarmer", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setFarmDispatched(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [profileImage, setProfileImage] = useState("");
  const handleEditProfile = () => {
    const formData = new FormData();
    formData.append("image", profileImage);

    axios.post("http://localhost:8000/...", formData, {
      headers: {
        authorization: `${localStorage.getItem("accessToken")}`,
      },
    });
  };

  return (
    <RequireAuth>
      <>
        <Head>
          <title>{user.name}</title>
          <meta name="description" content="Profile Page for Agro App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main className="bg-gray-100 min-h-screen">
          <div className="px-32">
            <div className="bg-primary my-10 rounded-md  flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center gap-16 mt-10 pb-5 border-b border-black">
                <div className="relative inline-block">
                  <div className="relative">
                    <img
                      src={profile_picture.src}
                      alt="Profile image"
                      className={"rounded-full"}
                      style={{ filter: showEditIcon ? "blur(2px)" : "none" }}
                      width={208}
                      height={208}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                    {/* Position the edit icon at the bottom center of the image */}
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 bottom-0 transition-opacity duration-300 ${
                        showEditIcon ? "opacity-100" : "opacity-0"
                      }`}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}>
                      {/* Add a gray background to the edit icon */}
                      <div
                        className="bg-gray-500 rounded-full p-2"
                        onClick={handleEditProfile}>
                        <EditOutlinedIcon className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 h-[223px] w-[701px] flex justify-start items-center">
                  <div className="font-medium text-xl">
                    <ul className="text-left">
                      <li>Name: {user.name}</li>
                      <li>Role: {user.role}</li>
                      <li>Email: {user.email}</li>
                      <li>Location: Kathmandu</li>
                      {/* <li>Some Information</li> */}
                    </ul>
                    <button
                      onClick={handleLogout}
                      className="bg-white border-black border px-3  rounded-xl mt-5">
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              {user.role == "farmer" && <FarmerPage />}

              {user.role == "retailer/wholeseller" && <UserPage />}

              {user.role == "trucker" && <TruckerPage />}

              {user.role == "admin" && <AdminPage /> }
            </div>
          </div>
        </main>
      </>
    </RequireAuth>
  );
}

export default ProfilePage;

// import axios from "axios";
// import Head from "next/head";
// // import Image from "next/image";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import profile_picture from "../assets/img/profile.png";
// import { useAuth } from "../Authentication/auth";
// import Header from "../components/Header";

// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
// import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// import { toast } from "react-toastify";

// export default function ProfilePage() {
//   const auth = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!auth.isLoding && !auth.loggedIn) {
//       router.push("/login");
//     }
//   }, []);

//   const [productList, setProductList] = useState([]);

//   const handleLogout = () => {
//     router.push("/");
//     auth.logout();
//   };

//   //profile picture edit
//   const [showEditIcon, setShowEditIcon] = useState(false);

//   const handleMouseEnter = () => {
//     setShowEditIcon(true);
//   };
//   const handleMouseLeave = () => {
//     setShowEditIcon(false);
//   };

//   const [addProduct, setAddProduct] = useState(false);
//   const [viewProduct, setViewProduct] = useState(false);
//   const [edit, setEdit] = useState({ mode: false, product: {} });
//   const [editProduct, setEditProduct] = useState({});

//   const [productHistory, setProductHistory] = useState(false);
//   const [myHistory, setMyHistory] = useState([]);

//   const [myProduct, setMyProduct] = useState([]);

//   const [loadingProduct, setLoadingProduct] = useState(false);

//   const handleAddProduct = async () => {
//     addProduct ? setAddProduct(false) : setAddProduct(true);

//     setLoadingProduct(true);

//     axios
//       .post("http://localhost:8000/plans/productList", {
//         headers: {
//           authorization: `${localStorage.getItem("accessToken")}`,
//         },
//       })
//       .then((res) => {
//         // console.log(res.data.product);
//         setProductList(res.data.product);
//         setLoadingProduct(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoadingProduct(false);
//       });
//   };

//   const handleEdit = (product) => {
//     setEdit((prevState) => ({
//       ...prevState,
//       mode: true,
//       product: product,
//     }));
//   };

//   const handleEditProduct = (e) => {
//     setEditProduct((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmitEdit = (product) => {
//     // editProduct.name = edit.product.name;
//     // editProduct._id = edit.product._id;
//     // console.log(editProduct, product._id)
//     if (confirm("Confirm Edit")) {
//       axios
//         .patch(`http://localhost:8000/plans/crudPlan/${product._id}`, {
//           headers: {
//             authorization: `${localStorage.getItem("accessToken")}`,
//           },
//           editProduct,
//         })
//         .then((res) => {
//           // console.log(res)
//           setEdit(false);
//           setEditProduct({});
//           getProducts();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   const handleCancelEdit = () => {
//     setEdit(false);
//     setEditProduct({});
//   };

//   const handleDelete = (product) => {
//     // console.log(id)
//     confirm("Confirm delete") &&
//       axios.delete(`http://localhost:8000/plans/crudPlan/${product._id}`, {
//         data: {
//           headers: {
//             authorization: `${localStorage.getItem("accessToken")}`,
//           },
//         },
//       });
//   };

//   const getProducts = () => {
//     axios
//       .post("http://localhost:8000/plans/crudPlan/farmer", {
//         headers: {
//           authorization: `${localStorage.getItem("accessToken")}`,
//         },
//       })
//       .then((res) => {
//         setMyProduct(res.data.data);
//         // console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleViewProduct = () => {
//     viewProduct ? setViewProduct(false) : setViewProduct(true);
//     getProducts();
//   };

//   const [newProduct, setNewProduct] = useState({
//     productId: "",
//     duration: "",
//     quantity: "",
//     category: "",
//     unit: "",
//     price: "",
//     discount: "",
//     description: "",
//     image: "",
//   });

//   const handleChange = (e) => {
//     setNewProduct((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const [predictedPrice, setPredictedPrice] = useState(0);

//   const handleInputChange = (e) => {
//     setNewProduct((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));

//     axios
//       .post("http://localhost:8000/plans/productHelper", {
//         headers: {
//           authorization: `${localStorage.getItem("accessToken")}`,
//         },
//         productId: e.target.value,
//       })
//       .then((res) => {
//         console.log(res);
//         setNewProduct((prevState) => ({
//           ...prevState,
//           category: res.data.category.category,
//           unit: res.data.category.unit,
//         }));
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     // axios.post("http://localhost:5000/",{
//     //   product :
//     // }).then((res)=>{
//     //   setPredictedPrice(res.)
//     //   console.log(res);
//     // }).catch((err)=>{
//     //   console.log(err)
//     // })
//   };

//   const handleImageChange = (e) => {
//     setNewProduct((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.files[0],
//     }));
//   };

//   const handleSubmitProduct = (event) => {
//     event.preventDefault();

//     console.log(newProduct);
//     const formData = new FormData();
//     formData.append("productId", newProduct.productId);
//     formData.append("category", newProduct.category);
//     formData.append("duration", newProduct.duration);
//     formData.append("price", newProduct.price);
//     formData.append("quantity", newProduct.quantity);
//     formData.append("unit", newProduct.unit);
//     formData.append("discount", newProduct.discount);
//     formData.append("description", newProduct.description);
//     formData.append("image", newProduct.image);

//     axios
//       .post("http://localhost:8000/plans/crudPlan", formData, {
//         headers: {
//           authorization: `${localStorage.getItem("accessToken")}`,
//         },
//       })
//       .then(() => {
//         // console.log("success")
//         setNewProduct((newProduct) => ({
//           ...newProduct,
//           name: "",
//           duration: "",
//           category: "",
//           quantity: "",
//           unit: "",
//           price: "",
//           discount: "",
//           description: "",
//           image: "",
//         }));
//         document.getElementById("makedef").value = "DEFAULT";
//         toast("Item added successfully");
//       })
//       .catch((err) => {
//         // console.log(err)
//         toast.error(err.response?.data?.message || err.message);
//       });
//   };

//   //for retailer/wholeseller product history
//   const getProductsHistory = () => {
//     axios
//       .post("http://localhost:8000/status/seeProductStatus", {
//         headers: {
//           authorization: `${localStorage.getItem("accessToken")}`,
//         },
//       })
//       .then((res) => {
//         setMyHistory(res.data.plans);
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleProductHistory = () => {
//     productHistory ? setProductHistory(false) : setProductHistory(true);
//     getProductsHistory();
//   };

//   //for trucker product assigned list
//   const [truckerProduct, setTruckerProduct] = useState([]);
//   const handleTruckerHistory = () => {
//     productHistory ? setProductHistory(false) : setProductHistory(true);

//     axios
//       .post("http://localhost:8000/status/seeProductStatusByTrucker", {
//         headers: {
//           authorization: `${localStorage.getItem("accessToken")}`,
//         },
//       })
//       .then((res) => {
//         setTruckerProduct(res.data.data);
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   //for trucker change status processing to dispatch
//   const handleEditStatus = (id) => {
//     axios.post("http://localhost:8000/status/changeProductStatus", {
//       headers: {
//         authorization: `${localStorage.getItem("accessToken")}`,
//       },
//       statusid: id,
//       status: "Product dispatched from farmer",
//     });
//   };

//   const [isAssign, setIsAssign] = useState(false); //is Unassigned button clicked
//   const [unAssignProduct, setUnAssignProduct] = useState([]); //list of items to be assigned to trucker for disptach from farm
//   const [toBeAssignedList, setToBeAssignedList] = useState([]); //list of items to be assigned to specific trucker

//   const [clickAssign, setClickAssign] = useState(false); //once clicked will show list of available trucker
//   const [availableTrucker, setAvailbleTrucker] = useState([]); //list of available truckers
//   // const [isDispatched, setIsDispatched] = useState(true);

//   const [checkCountUnassigned, setCheckCountUnassigned] = useState(0);

//   const [checkCountAgrotech, setCheckCountAgrotech] = useState(0);
//   const [checkCountAgrotechDispatch, setCheckCountAgrotechDispatch] =
//     useState(0);
//   const [checkCountDelivered, setCheckCountDelivered] = useState(0);
//   const [isAssignProducts, setAssignProduct] = useState(true);
//   const handleAssignProduct = () => {};

//   //fetching unassigned list of product (i.e, just bought by customers)
//   const handleUnAssignProduct = () => {
//     isAssign ? setIsAssign(false) : setIsAssign(true);

//     axios
//       .post("http://localhost:8000/status/seeProductStatus", {
//         headers: {
//           authorization: `${localStorage.getItem("accessToken")}`,
//         },
//       })
//       .then((res) => {
//         setUnAssignProduct(res.data.data);
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   //making list of product to be assigned by admin
//   const handleAddAssignList = (event) => {
//     console.log(event.target.checked);
//     const checkboxId = event.target.value;
//     if (event.target.checked) {
//       setCheckCountUnassigned(checkCountUnassigned + 1);
//       setToBeAssignedList([...toBeAssignedList, checkboxId]);
//     } else {
//       const updatedIds = toBeAssignedList.filter((id) => id !== checkboxId);
//       setToBeAssignedList(updatedIds);
//       setCheckCountUnassigned(checkCountUnassigned - 1);
//     }
//   };

//   //fetch available trucker list by admin
//   const handleAssign = () => {
//     setClickAssign(true);
//     axios
//       .post("http://localhost:8000/status/seeOnlineTruckerStatus", {
//         headers: {
//           authorization: `${localStorage.getItem("accessToken")}`,
//         },
//       })
//       .then((res) => {
//         setAvailbleTrucker(res.data.data);
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   //assigning a list of products to a farmer
//   const handleTruckAssign = (id) => {
//     // console.log(toBeAssignedList);
//     axios
//       .post("http://localhost:8000/status/assignTrucker", {
//         headers: {
//           authorization: `${localStorage.getItem("accessToken")}`,
//         },
//         statusId: toBeAssignedList,
//         truckerId: id,
//       })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const [isFarmDispatch, setIsFarmDispatch] = useState(false);
//   const [farmDispatched, setFarmDispatched] = useState([]);
//   const [checkCountFarmDispatch, setCheckCountFarmDispatch] = useState(0);

//   const handleFarmDispatch = () => {
//     isFarmDispatch ? setIsFarmDispatch(false) : setIsFarmDispatch(true);

//     axios
//       .post("http://localhost:8000/status/seeProductDispatchedFromFarmer", {
//         headers: {
//           authorization: `${localStorage.getItem("accessToken")}`,
//         },
//       })
//       .then((res) => {
//         setFarmDispatched(res.data.data);
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const [profileImage, setProfileImage] = useState("");
//   const handleEditProfile = () => {
//     const formData = new FormData();
//     formData.append("image", profileImage);

//     axios.post("http://localhost:8000/...", formData, {
//       headers: {
//         authorization: `${localStorage.getItem("accessToken")}`,
//       },
//     });
//   };

//   return (
//     <>
//       <Head>
//         <title>{auth.name}</title>
//         <meta name="description" content="Profile Page for Agro App" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Header />

//       <main className="bg-gray-100 min-h-screen">
//         <div className="px-32">
//           <div className="bg-primary my-10 rounded-md  flex flex-col justify-center items-center">
//             <div className="flex flex-row justify-center gap-16 mt-10 pb-5 border-b border-black">
//               <div className="relative inline-block">
//                 <div className="relative">
//                   <img
//                     src={profile_picture.src}
//                     alt="Profile image"
//                     className={"rounded-full"}
//                     style={{ filter: showEditIcon ? "blur(2px)" : "none" }}
//                     width={208}
//                     height={208}
//                     onMouseEnter={handleMouseEnter}
//                     onMouseLeave={handleMouseLeave}
//                   />
//                   {/* Position the edit icon at the bottom center of the image */}
//                   <div
//                     className={`absolute left-1/2 transform -translate-x-1/2 bottom-0 transition-opacity duration-300 ${
//                       showEditIcon ? "opacity-100" : "opacity-0"
//                     }`}
//                     onMouseEnter={handleMouseEnter}
//                     onMouseLeave={handleMouseLeave}>
//                     {/* Add a gray background to the edit icon */}
//                     <div
//                       className="bg-gray-500 rounded-full p-2"
//                       onClick={handleEditProfile}>
//                       <EditOutlinedIcon className="text-white text-xl" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white rounded-xl p-5 h-[223px] w-[701px] flex justify-start items-center">
//                 <div className="font-medium text-xl">
//                   <ul className="text-left">
//                     <li>Name: {auth.name}</li>
//                     <li>Role: {auth.role}</li>
//                     <li>Email: {auth.email}</li>
//                     <li>Location: Kathmandu</li>
//                     {/* <li>Some Information</li> */}
//                   </ul>
//                   <button
//                     onClick={handleLogout}
//                     className="bg-white border-black border px-3  rounded-xl mt-5">
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {auth.role == "farmer" && (
//               <div className="flex flex-col gap-5 items-center w-11/12 lg:w-4/5 m-5">
//                 {/* div to add product in the farmer list*/}
//                 <button
//                   onClick={handleAddProduct}
//                   className="bg-white border-black border px-3  rounded-xl">
//                   {/* button for add product*/}
//                   Add Entries
//                   <span>
//                     {addProduct ? (
//                       <ArrowDropUpIcon className="h-10 w-10" />
//                     ) : (
//                       <ArrowDropDownIcon className="h-10 w-10" />
//                     )}
//                   </span>
//                 </button>
//                 {addProduct && (
//                   <div className="bg-white flex  flex-col w-1/2 rounded-xl p-10 justify-center py-10">
//                     <form
//                       onSubmit={handleSubmitProduct}
//                       className="flex flex-col gap-5 justify-start items-start w-11/12">
//                       <div className="flex flex-col lg:flex-row  w-full">
//                         <label className="w-1/3">Name</label>
//                         <select
//                           id="makedef"
//                           name="productId"
//                           defaultValue={"DEFAULT"}
//                           // value = {selectedProduct.name}
//                           onChange={handleInputChange}
//                           className="text-sm pl-1 text-gray-400 py-1 bg-gray-200 rounded-md w-2/3   border-2 focus:outline-none focus-within:border-blue-500 rounded-md">
//                           <option
//                             value="DEFAULT"
//                             disabled
//                             className="text-gray-400">
//                             Select Product
//                           </option>
//                           {loadingProduct ? (
//                             <option disabled>Loading Products...</option>
//                           ) : (
//                             productList.map((product, idx) => {
//                               return (
//                                 <option value={product._id} key={idx}>
//                                   {product.name}
//                                 </option>
//                               );
//                             })
//                           )}
//                         </select>
//                       </div>
//                       <div className="flex flex-col lg:flex-row  w-full">
//                         <label className="w-1/3">Category</label>
//                         {/* <input
//                           value={newProduct.category}
//                           placeholder={"fruits"}
//                           type="text"
//                           onChange={handleChange}
//                           name="category"
//                           className="bg-gray-200 rounded-md w-2/3 "
//                         /> */}
//                         <label className="bg-gray-200 rounded-md w-2/3 ">
//                           {newProduct.category
//                             ? newProduct.category
//                             : "Select Product First"}
//                         </label>
//                       </div>
//                       <div className="flex flex-col lg:flex-row  w-full">
//                         <label className="w-1/3">Life Time</label>
//                         <input
//                           value={newProduct.duration}
//                           placeholder={"30"}
//                           type="text"
//                           onChange={handleChange}
//                           name="duration"
//                           className="bg-gray-200 rounded-md w-2/3 "
//                         />
//                       </div>
//                       <div className="flex flex-col lg:flex-row  w-full">
//                         <label className="w-1/3">Price</label>
//                         <input
//                           value={newProduct.price}
//                           placeholder={"350"}
//                           type="text"
//                           onChange={handleChange}
//                           name="price"
//                           className="bg-gray-200 rounded-md w-2/3 "
//                         />
//                       </div>

//                       <div className="flex flex-col lg:flex-row  w-full">
//                         <label className="w-1/3">Quantity</label>
//                         <input
//                           value={newProduct.quantity}
//                           placeholder={"350"}
//                           type="text"
//                           onChange={handleChange}
//                           name="quantity"
//                           className={
//                             newProduct.category
//                               ? "bg-gray-200 rounded-md w-1/2 "
//                               : "bg-gray-200 rounded-md w-2/3 "
//                           }
//                         />
//                         {newProduct.category && (
//                           <label>/{newProduct.unit}</label>
//                         )}
//                       </div>
//                       <div className="flex flex-col lg:flex-row  w-full">
//                         <label className="w-1/3">Discount</label>
//                         <input
//                           value={newProduct.discount}
//                           placeholder={"10"}
//                           type="text"
//                           onChange={handleChange}
//                           name="discount"
//                           className="bg-gray-200 rounded-md w-2/3 "
//                         />
//                       </div>

//                       <div className="flex flex-col lg:flex-row  w-full">
//                         <label className="w-1/3">Description</label>
//                         <input
//                           value={newProduct.description}
//                           placeholder={"best apple from Helambu"}
//                           type="text"
//                           onChange={handleChange}
//                           name="description"
//                           className="bg-gray-200 rounded-md w-2/3 "
//                         />
//                       </div>

//                       <div className="flex flex-col lg:flex-row  w-full">
//                         <label className="w-1/3">Product Image</label>
//                         <input
//                           type="file"
//                           name="image"
//                           accept="image/*"
//                           className="w-2/3 "
//                           onChange={handleImageChange}
//                         />
//                       </div>

//                       <button
//                         type="submit"
//                         className="self-center bg-gray-200 px-3 py-1 rounded-lg">
//                         Submit
//                       </button>
//                     </form>
//                   </div>
//                 )}
//                 <button
//                   onClick={handleViewProduct}
//                   className="bg-white border-black border px-3  rounded-xl">
//                   View Entries
//                   <span>
//                     {viewProduct ? (
//                       <ArrowDropUpIcon className="h-10 w-10" />
//                     ) : (
//                       <ArrowDropDownIcon className="h-10 w-10" />
//                     )}
//                   </span>
//                 </button>
//                 {viewProduct && (
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 self-center justify-center p-10 items-center w-full">
//                     {myProduct.map((product, idx) => {
//                       return (
//                         <div
//                           key={idx}
//                           className="bg-white flex flex-col rounded-xl p-10 justify-center  ">
//                           <div className="flex flex-col gap-5 justify-start items-start w-11/12">
//                             <div className="flex flex-row  w-full">
//                               <span className="w-2/5">Name</span>
//                               <span className="w-3/5">{product.name}</span>
//                             </div>
//                             <div className="flex flex-row w-full  ">
//                               <span className="w-2/5">Life Time</span>
//                               <span className="w-3/5">
//                                 {product.duration} days
//                               </span>
//                             </div>
//                             <div className="flex flex-row  w-full">
//                               <span className="w-2/5">Price</span>
//                               <span className="w-3/5">{product.price}</span>
//                             </div>
//                             <div className="flex flex-row w-full ">
//                               <span className="w-2/5">Discount</span>
//                               <span className="w-3/5">{product.discount}%</span>
//                             </div>
//                             <div className="w-1/2 flex justify-around item-center">
//                               <button
//                                 onClick={() => {
//                                   handleEdit(product);
//                                 }}>
//                                 <EditOutlinedIcon />
//                               </button>
//                               <button
//                                 onClick={() => {
//                                   handleDelete(product);
//                                 }}>
//                                 <DeleteOutlinedIcon />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//                 {edit.mode && (
//                   <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center">
//                     <div className="bg-white rounded-lg shadow-lg">
//                       <div className="bg-[#BBB] flex flex-col rounded-xl p-10 justify-center w-[400px] h-[400px] ">
//                         <div className="flex flex-col gap-5 justify-start items-start w-11/12">
//                           <div className="flex flex-row  w-full">
//                             <span className="w-2/5">Name</span>
//                             <span className="w-3/5">{edit.product.name}</span>
//                           </div>
//                           <div className="flex flex-row w-full  ">
//                             <span className="w-2/5">Life Time</span>
//                             {/* <span className="w-3/5">
//                               {product.duration} days
//                             </span> */}
//                             <input
//                               value={editProduct.duration}
//                               placeholder={edit.product.duration}
//                               type="text"
//                               onChange={handleEditProduct}
//                               name="duration"
//                               className="bg-gray-200 rounded-md w-2/3 "
//                             />
//                           </div>
//                           <div className="flex flex-row  w-full">
//                             <span className="w-2/5">Price</span>
//                             {/* <span className="w-3/5">{product.price}</span> */}
//                             <input
//                               value={editProduct.price}
//                               placeholder={edit.product.price}
//                               type="text"
//                               onChange={handleEditProduct}
//                               name="price"
//                               className="bg-gray-200 rounded-md w-2/3 "
//                             />
//                           </div>
//                           <div className="flex flex-row w-full ">
//                             <span className="w-2/5">Discount</span>
//                             {/* <span className="w-3/5">{product.discount}%</span> */}
//                             <input
//                               value={editProduct.discount}
//                               placeholder={edit.product.discount}
//                               type="text"
//                               onChange={handleEditProduct}
//                               name="discount"
//                               className="bg-gray-200 rounded-md w-2/3 "
//                             />
//                           </div>
//                           <div className="w-full flex justify-around py-3">
//                             <button
//                               onClick={() => {
//                                 handleSubmitEdit(edit.product);
//                               }}>
//                               <SaveOutlinedIcon />
//                               <span>Save</span>
//                             </button>
//                             <button
//                               onClick={() => {
//                                 handleCancelEdit();
//                               }}>
//                               <CancelOutlinedIcon />
//                               <span>Cancel</span>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {(auth.role == "retailer/wholeseller" || auth.role == "farmer") && (
//               <div className="flex flex-col gap-5 items-center w-11/12 lg:w-4/5 m-5">
//                 <button
//                   onClick={handleProductHistory}
//                   className="bg-white border-black border px-3  rounded-xl">
//                   Product History
//                   <span>
//                     {productHistory ? (
//                       <ArrowDropUpIcon className="h-10 w-10" />
//                     ) : (
//                       <ArrowDropDownIcon className="h-10 w-10" />
//                     )}
//                   </span>
//                 </button>
//                 {productHistory && (
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 self-center justify-center p-10 items-center w-full">
//                     {myHistory.map((product, idx) => {
//                       return (
//                         <div
//                           key={idx}
//                           className="bg-white flex flex-col rounded-xl p-10 justify-center  ">
//                           <div className="flex flex-col gap-5 justify-start items-start w-11/12">
//                             <div className="flex flex-row  w-full">
//                               <span className="w-2/5">Name</span>
//                               <span className="w-3/5">
//                                 {product.productname}
//                               </span>
//                             </div>
//                             <div className="flex flex-row  w-full">
//                               <span className="w-2/5">Price</span>
//                               <span className="w-3/5">{product.price}</span>
//                             </div>
//                             <div className="flex flex-row w-full ">
//                               <span className="w-2/5">Quantity</span>
//                               <span className="w-3/5">{product.quantity}</span>
//                             </div>
//                             <div className="flex flex-row w-full ">
//                               <span className="w-2/5">Status</span>
//                               <span className="w-3/5">{product.status}</span>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             )}

//             {auth.role == "trucker" && (
//               <div className="flex flex-col gap-5 items-center w-11/12 lg:w-4/5 m-5">
//                 <button
//                   onClick={handleTruckerHistory}
//                   className="bg-white border-black border px-3  rounded-xl">
//                   Assigned Product
//                   <span>
//                     {productHistory ? (
//                       <ArrowDropUpIcon className="h-10 w-10" />
//                     ) : (
//                       <ArrowDropDownIcon className="h-10 w-10" />
//                     )}
//                   </span>
//                 </button>
//                 {productHistory && (
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 self-center justify-center p-10 items-center w-full">
//                     {truckerProduct.map((product, idx) => {
//                       return (
//                         <div
//                           key={idx}
//                           className="bg-white flex flex-col rounded-xl p-10 justify-center  ">
//                           <div className="flex flex-col gap-5 justify-start items-start w-11/12">
//                             <div className="flex flex-row  w-full">
//                               <span className="w-2/5">Name</span>
//                               <span className="w-3/5">
//                                 {product.productname}
//                               </span>
//                             </div>
//                             <div className="flex flex-row w-full ">
//                               <span className="w-2/5">Quantity</span>
//                               <span className="w-3/5">{product.quantity}</span>
//                             </div>
//                             <div className="flex flex-row w-full ">
//                               <span className="w-2/5">Status</span>
//                               <span className="w-3/5">{product.status}</span>
//                               {product.status == "Trucker Assigned" && (
//                                 <button
//                                   onClick={() => {
//                                     handleEditStatus(product._id);
//                                   }}>
//                                   <EditOutlinedIcon />
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             )}

//             {auth.role == "admin" && (
//               <div className="flex flex-col gap-5 items-center w-11/12 lg:w-4/5 m-5">
//                 {/* Unassigned Product */}

//                 <button
//                   onClick={handleUnAssignProduct}
//                   className="bg-white border-black border px-3  rounded-xl">
//                   Unassigned Products
//                   <span>
//                     {isAssign ? (
//                       <ArrowDropUpIcon className="h-10 w-10" />
//                     ) : (
//                       <ArrowDropDownIcon className="h-10 w-10" />
//                     )}
//                   </span>
//                 </button>
//                 {isAssign && (
//                   <>
//                     <button
//                       className={`bg-blue-500 text-white py-2 px-4 mt-2 rounded-md ${
//                         checkCountUnassigned
//                           ? ""
//                           : "opacity-50 cursor-not-allowed"
//                       }`}
//                       disabled={!checkCountUnassigned}
//                       onClick={handleAssign}>
//                       Assign to Trucker
//                     </button>
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 self-center justify-center p-10 items-center w-full">
//                       {unAssignProduct.map((product, idx) => {
//                         return (
//                           <div
//                             key={idx}
//                             className="bg-white flex flex-col rounded-xl p-10 justify-center relative ">
//                             <input
//                               type="checkbox"
//                               className="absolute top-0 right-0 mt-5 mr-5  w-4 h-4"
//                               onChange={handleAddAssignList}
//                               value={product._id}
//                             />
//                             <div className="flex flex-col gap-5 justify-start items-start w-11/12">
//                               <div className="flex flex-row  w-full">
//                                 <span className="w-2/5">Name</span>
//                                 <span className="w-3/5">
//                                   {product.productname}
//                                 </span>
//                               </div>
//                               <div className="flex flex-row w-full ">
//                                 <span className="w-2/5">Quantity</span>
//                                 <span className="w-3/5">
//                                   {product.quantity}
//                                 </span>
//                               </div>
//                               <div className="flex flex-row w-full ">
//                                 <span className="w-2/5">Status</span>
//                                 <span className="w-3/5">{product.status}</span>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                     {clickAssign && (
//                       // <div className="fixed z-50 top-0 left-0 w-full h-full flex flex-col  items-center justify-center">
//                       //   <div className="w-[50%] h-[50%] bg-[#d9d9d9]">
//                       //     <div>
//                       //       {availableTrucker.map((trucker, idx) => {
//                       //         return (
//                       //           <div
//                       //             onClick={() => {
//                       //               handleTruckAssign(trucker._id);
//                       //             }}>
//                       //             <h1>Name : {trucker.name}</h1>
//                       //             <h3>Email : {trucker.email}</h3>
//                       //           </div>
//                       //         );
//                       //       })}
//                       //     </div>
//                       //     <button
//                       //       onClick={() => {
//                       //         setClickAssign(false);
//                       //       }}>
//                       //       Cancel
//                       //     </button>
//                       //   </div>
//                       // </div>
//                       <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//                         <div className="bg-white p-4 rounded-lg w-104 h-104">
//                           <h2 className="text-lg font-medium mb-2">
//                             Available Trucker
//                           </h2>
//                           {availableTrucker.map((trucker, idx) => (
//                             <div key={idx} className="m-4 hover:cursor-pointer">
//                               <div className="font-medium">{trucker.name}</div>
//                               <div className="text-gray-600 text-sm">
//                                 {trucker.email}
//                               </div>
//                             </div>
//                           ))}
//                           <button
//                             onClick={() => {
//                               setClickAssign(false);
//                             }}
//                             className=" w-full items-center">
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Assigned but not dispatched */}

//                 <button
//                   // onClick={handleTruckerAssigned}
//                   className="bg-white border-black border px-3  rounded-xl">
//                   Assigned Products
//                   <span>
//                     {isAssignProducts ? (
//                       <ArrowDropUpIcon className="h-10 w-10" />
//                     ) : (
//                       <ArrowDropDownIcon className="h-10 w-10" />
//                     )}
//                   </span>
//                 </button>
//                 {isFarmDispatch && (
//                   <>
//                     <button
//                       className={`bg-blue-500 text-white py-2 px-4 mt-2 rounded-md ${
//                         checkCountFarmDispatch
//                           ? ""
//                           : "opacity-50 cursor-not-allowed"
//                       }`}
//                       disabled={!checkCountFarmDispatch}
//                       onClick={handleAssign}>
//                       Assign to Trucker
//                     </button>
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 self-center justify-center p-10 items-center w-full">
//                       {farmDispatched.map((product, idx) => {
//                         return (
//                           <div
//                             key={idx}
//                             className="bg-white flex flex-col rounded-xl p-10 justify-center relative ">
//                             <input
//                               type="checkbox"
//                               className="absolute top-0 right-0 mt-5 mr-5  w-4 h-4"
//                               onChange={handleAddAssignList}
//                               value={product._id}
//                             />
//                             <div className="flex flex-col gap-5 justify-start items-start w-11/12">
//                               <div className="flex flex-row  w-full">
//                                 <span className="w-2/5">Name</span>
//                                 <span className="w-3/5">
//                                   {product.productname}
//                                 </span>
//                               </div>
//                               <div className="flex flex-row w-full ">
//                                 <span className="w-2/5">Quantity</span>
//                                 <span className="w-3/5">
//                                   {product.quantity}
//                                 </span>
//                               </div>
//                               <div className="flex flex-row w-full ">
//                                 <span className="w-2/5">Status</span>
//                                 <span className="w-3/5">{product.status}</span>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </>
//                 )}
//                 <button
//                   onClick={handleFarmDispatch}
//                   className="bg-white border-black border px-3  rounded-xl">
//                   Dispatched Products (from Farm)
//                   <span>
//                     {isFarmDispatch ? (
//                       <ArrowDropUpIcon className="h-10 w-10" />
//                     ) : (
//                       <ArrowDropDownIcon className="h-10 w-10" />
//                     )}
//                   </span>
//                 </button>
//                 {isFarmDispatch && (
//                   <>
//                     <button
//                       className={`bg-blue-500 text-white py-2 px-4 mt-2 rounded-md ${
//                         checkCountFarmDispatch
//                           ? ""
//                           : "opacity-50 cursor-not-allowed"
//                       }`}
//                       disabled={!checkCountFarmDispatch}
//                       onClick={handleAssign}>
//                       Assign to Trucker
//                     </button>
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 self-center justify-center p-10 items-center w-full">
//                       {farmDispatched.map((product, idx) => {
//                         return (
//                           <div
//                             key={idx}
//                             className="bg-white flex flex-col rounded-xl p-10 justify-center relative ">
//                             <input
//                               type="checkbox"
//                               className="absolute top-0 right-0 mt-5 mr-5  w-4 h-4"
//                               onChange={handleAddAssignList}
//                               value={product._id}
//                             />
//                             <div className="flex flex-col gap-5 justify-start items-start w-11/12">
//                               <div className="flex flex-row  w-full">
//                                 <span className="w-2/5">Name</span>
//                                 <span className="w-3/5">
//                                   {product.productname}
//                                 </span>
//                               </div>
//                               <div className="flex flex-row w-full ">
//                                 <span className="w-2/5">Quantity</span>
//                                 <span className="w-3/5">
//                                   {product.quantity}
//                                 </span>
//                               </div>
//                               <div className="flex flex-row w-full ">
//                                 <span className="w-2/5">Status</span>
//                                 <span className="w-3/5">{product.status}</span>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </>
//                 )}
//                 <button
//                   onClick={handleAssignProduct}
//                   className="bg-white border-black border px-3  rounded-xl">
//                   Products in Agrotech
//                   <span>
//                     {isAssign ? (
//                       <ArrowDropUpIcon className="h-10 w-10" />
//                     ) : (
//                       <ArrowDropDownIcon className="h-10 w-10" />
//                     )}
//                   </span>
//                 </button>
//                 <button
//                   onClick={handleAssignProduct}
//                   className="bg-white border-black border px-3  rounded-xl">
//                   Dispatched Product (from Agrotech)
//                   <span>
//                     {isAssign ? (
//                       <ArrowDropUpIcon className="h-10 w-10" />
//                     ) : (
//                       <ArrowDropDownIcon className="h-10 w-10" />
//                     )}
//                   </span>
//                 </button>
//                 <button
//                   onClick={handleAssignProduct}
//                   className="bg-white border-black border px-3  rounded-xl">
//                   Delivered Products
//                   <span>
//                     {isAssign ? (
//                       <ArrowDropUpIcon className="h-10 w-10" />
//                     ) : (
//                       <ArrowDropDownIcon className="h-10 w-10" />
//                     )}
//                   </span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }
