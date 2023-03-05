import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import profile_picture from "../assets/img/profile.png";
import { useAuth } from "../Authentication/auth";
import Header from "../components/Header";

import StarIcon from "@mui/icons-material/Star";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function ProfilePage() {
  // const [name, setName] = useState(null);
  // const [role, setRole] = useState(null);
  // const [email, setEmail] = useState(null);

  // useEffect(()=>{
  //   localStorage.getItem("accessToken") && axios.post("http://localhost:8000/user/isLogin", {
  //   headers: {
  //       'authorization': `${localStorage.getItem("accessToken")}`
  //   }
  //   })
  //   .then((res)=>{
  //       // console.log(res)
  //       setEmail(res.data.email);
  //       setName(res.data.name);
  //       setRole(res.data.role)
  //   })
  //   .catch((err)=>{

  //   })
  // },[])

  const auth = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    auth.logout();
    router.push("/");
    console.log("pushed");
  };
  // if (!auth.loggedIn) {
  //   router.push("/");
  // }

  const [addProduct, setAddProduct] = useState(false);
  const [viewProduct, setViewProduct] = useState(false);
  const [viewCart, setViewCart] = useState(false);

  const [myProduct, setMyProduct] = useState([]);

  const handleAddProduct = () => {
    addProduct ? setAddProduct(false) : setAddProduct(true);
  };

  const handleViewProduct = () => {
    viewProduct ? setViewProduct(false) : setViewProduct(true);

    viewProduct &&
      axios
        .post("http://localhost:8000/plans/crudPlan/farmer", {
          headers: {
            authorization: `${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          setMyProduct(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          // console.log("Error while fetching products form the server")
          console.log(err);
        });
  };

  const handleViewCart = () => {
    viewCart ? setViewCart(false) : setViewCart(true);
  };

  const [newProduct, setNewProduct] = useState({
    name: "",
    duration: "",
    quantity: "",
    unit: "",
    price: "",
    discount: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitProduct = (event) => {
    event.preventDefault();
    console.log(newProduct);
    axios
      .post("http://localhost:8000/plans/crudPlan", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
        name: newProduct.name,
        duration: newProduct.duration,
        quantity: newProduct.quantity,
        unit: newProduct.unit,
        price: newProduct.price,
        discount: newProduct.discount,
        description: newProduct.description,
      })
      .then(() => {
        // console.log('data sent')
        newProduct.name = "";
        newProduct.duration = "";
        newProduct.price = "";
        newProduct.discount = "";
        newProduct.description = "";
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(newProduct)
  };

  return (
    <>
      <Head>
        <title>Profile | Agro Tech</title>
        <meta name="description" content="Profile Page for Agro App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="bg-gray-100 min-h-screen">
        <div className="px-32">
          <div className="bg-primary my-10 rounded-md  flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center gap-16 mt-10 pb-5 border-b border-black">
              <div className="rounded-full h-52 w-52 ">
                <Image
                  src={profile_picture}
                  alt="User Profile Picture"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
              <div className="bg-white rounded-xl p-5 h-[223px] w-[701px] flex justify-start items-center">
                <div className="font-medium text-xl">
                  <ul className="text-left">
                    <li>Name: {auth.name}</li>
                    <li>Role: {auth.role}</li>
                    <li>Email: {auth.email}</li>
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

            {auth.role == "farmer" && (
              <div className="flex flex-col gap-5 items-center w-11/12 lg:w-4/5 m-5">
                {/* div to add product in the farmer list*/}
                <button
                  onClick={handleAddProduct}
                  className="bg-white border-black border px-3  rounded-xl">
                  {/* button for add product*/}
                  Add Entries
                  <span>
                    {" "}
                    {addProduct ? (
                      <ArrowDropUpIcon className="h-10 w-10" />
                    ) : (
                      <ArrowDropDownIcon className="h-10 w-10" />
                    )}
                  </span>
                </button>
                {addProduct && (
                  <div className="bg-white flex  flex-col w-1/2 rounded-xl p-10 justify-center py-10">
                    <form
                      onSubmit={handleSubmitProduct}
                      className="flex flex-col gap-5 justify-start items-start w-11/12">
                      <div className="flex flex-col lg:flex-row  w-full">
                        <label className="w-1/3">Name</label>
                        <input
                          value={newProduct.name}
                          placeholder={"Apple"}
                          type="text"
                          onChange={handleChange}
                          name="name"
                          className="bg-gray-200 rounded-md w-2/3 "
                        />
                      </div>
                      <div className="flex flex-col lg:flex-row  w-full">
                        <label className="w-1/3">Life Time</label>
                        <input
                          value={newProduct.duration}
                          placeholder={"30"}
                          type="text"
                          onChange={handleChange}
                          name="duration"
                          className="bg-gray-200 rounded-md w-2/3 "
                        />
                      </div>
                      <div className="flex flex-col lg:flex-row  w-full">
                        <label className="w-1/3">Price</label>
                        <input
                          value={newProduct.price}
                          placeholder={"350"}
                          type="text"
                          onChange={handleChange}
                          name="price"
                          className="bg-gray-200 rounded-md w-2/3 "
                        />
                      </div>

                      <div className="flex flex-col lg:flex-row  w-full">
                        <label className="w-1/3">Quantity</label>
                        <input
                          value={newProduct.quantity}
                          placeholder={"350"}
                          type="text"
                          onChange={handleChange}
                          name="quantity"
                          className="bg-gray-200 rounded-md w-2/3 "
                        />
                      </div>
                      <div className="flex flex-col lg:flex-row  w-full">
                        <select
                          id="makedef"
                          name="unit"
                          defaultValue={"DEFAULT"}
                          onChange={handleChange}
                          className="w-52 text-sm pl-1 mb-4 text-gray-400 py-1   border-2 focus:outline-none focus-within:border-blue-500 rounded-md">
                          <option
                            value="DEFAULT"
                            disabled
                            className="text-gray-400">
                            Select Unit
                          </option>
                          <option value="KG">KG</option>
                          <option value="litre">Litre</option>
                          <option value="piece">Piece</option>
                          <option value="dozen">Dozen</option>
                        </select>
                      </div>

                      <div className="flex flex-col lg:flex-row  w-full">
                        <label className="w-1/3">Discount</label>
                        <input
                          value={newProduct.discount}
                          placeholder={"10"}
                          type="text"
                          onChange={handleChange}
                          name="discount"
                          className="bg-gray-200 rounded-md w-2/3 "
                        />
                      </div>

                      <div className="flex flex-col lg:flex-row  w-full">
                        <label className="w-1/3">Description</label>
                        <input
                          value={newProduct.description}
                          placeholder={"best apple from Helambu"}
                          type="text"
                          onChange={handleChange}
                          name="description"
                          className="bg-gray-200 rounded-md w-2/3 "
                        />
                      </div>

                      <button
                        type="submit"
                        className="self-center bg-gray-200 px-3 py-1 rounded-lg">
                        Submit
                      </button>
                    </form>
                  </div>
                )}
                <button
                  onClick={handleViewProduct}
                  className="bg-white border-black border px-3  rounded-xl">
                  View Entries
                  <span>
                    {viewProduct ? (
                      <ArrowDropUpIcon className="h-10 w-10" />
                    ) : (
                      <ArrowDropDownIcon className="h-10 w-10" />
                    )}
                  </span>
                </button>
                {viewProduct && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 self-center justify-center p-10 items-center w-full">
                    {myProduct.map((product, idx) => {
                      return (
                        <div
                          key={idx}
                          className="bg-white flex flex-col rounded-xl p-10 justify-center  ">
                          <div className="flex flex-col gap-5 justify-start items-start w-11/12">
                            <div className="flex flex-row  w-full">
                              <span className="w-2/5">Name</span>
                              <span className="w-3/5">{product.name}</span>
                            </div>
                            <div className="flex flex-row w-full  ">
                              <span className="w-2/5">Life Time</span>
                              <span className="w-3/5">
                                {product.duration} days
                              </span>
                            </div>
                            <div className="flex flex-row  w-full">
                              <span className="w-2/5">Price</span>
                              <span className="w-3/5">{product.price}</span>
                            </div>
                            <div className="flex flex-row w-full ">
                              <span className="w-2/5">Discount</span>
                              <span className="w-3/5">{product.discount}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
