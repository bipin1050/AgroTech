import axios from "axios";
import Head from "next/head";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import profile_picture from "../assets/img/profile.png";
import { useAuth } from "../Authentication/auth";
import Header from "../components/Header";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import swal from "sweetalert";
import { toast } from "react-toastify";

import Select from "react-select";

export default function ProfilePage() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoding && !auth.loggedIn) {
      router.push("/login");
    }
  }, []);

  const [productList, setProductList] = useState([]);

  const handleLogout = () => {
    auth.logout();
    router.push("/");
  };

  const [addProduct, setAddProduct] = useState(false);
  const [viewProduct, setViewProduct] = useState(false);
  const [edit, setEdit] = useState({ mode: false, product: {} });
  const [editProduct, setEditProduct] = useState({});

  const [myProduct, setMyProduct] = useState([]);

  const [loadingProduct, setLoadingProduct] = useState(false);

  const handleAddProduct = async () => {
    addProduct ? setAddProduct(false) : setAddProduct(true);

    setLoadingProduct(true);

    axios
      .post("http://localhost:8000/plans/productList", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.product);
        setProductList(res.data.product);
        setLoadingProduct(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingProduct(false);
      });
  };

  const handleEdit = (product) => {
    setEdit((prevState) => ({
      ...prevState,
      mode: true,
      product: product,
    }));
  };

  const handleEditProduct = (e) => {
    setEditProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitEdit = (product) => {
    // editProduct.name = edit.product.name;
    // editProduct._id = edit.product._id;
    // console.log(editProduct, product._id)
    if (confirm("Confirm Edit")) {
      axios
        .patch(`http://localhost:8000/plans/crudPlan/${product._id}`, {
          headers: {
            authorization: `${localStorage.getItem("accessToken")}`,
          },
          editProduct,
        })
        .then((res) => {
          // console.log(res)
          setEdit(false);
          setEditProduct({});
          getProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCancelEdit = () => {
    setEdit(false);
    setEditProduct({});
  };

  const handleDelete = (product) => {
    // console.log(id)
    confirm("Confirm delete") &&
      axios.delete(`http://localhost:8000/plans/crudPlan/${product._id}`, {
        data: {
          headers: {
            authorization: `${localStorage.getItem("accessToken")}`,
          },
        },
      });
  };

  const getProducts = () => {
    axios
      .post("http://localhost:8000/plans/crudPlan/farmer", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setMyProduct(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleViewProduct = () => {
    viewProduct ? setViewProduct(false) : setViewProduct(true);
    getProducts();
  };

  const [newProduct, setNewProduct] = useState({
    productId: "",
    duration: "",
    quantity: "",
    category: "",
    unit: "",
    price: "",
    discount: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setNewProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputChange = (e) => {
    setNewProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    axios
      .post("http://localhost:8000/plans/productHelper", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
        productId: e.target.value,
      })
      .then((res) => {
        console.log(res);
        setNewProduct((prevState) => ({
          ...prevState,
          category: res.data.category.category,
          unit : res.data.category.unit
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageChange = (e) => {
    setNewProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleSubmitProduct = (event) => {
    event.preventDefault();

    console.log(newProduct);
    const formData = new FormData();
    formData.append("productId", newProduct.productId);
    formData.append("category", newProduct.category);
    formData.append("duration", newProduct.duration);
    formData.append("price", newProduct.price);
    formData.append("quantity", newProduct.quantity);
    formData.append("unit", newProduct.unit);
    formData.append("discount", newProduct.discount);
    formData.append("description", newProduct.description);
    formData.append("image", newProduct.image);

    axios
      .post("http://localhost:8000/plans/crudPlan", formData, {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        // console.log("success")
        setNewProduct((newProduct) => ({
          ...newProduct,
          name: "",
          duration: "",
          category: "",
          quantity: "",
          unit: "",
          price: "",
          discount: "",
          description: "",
          image: "",
        }));
        document.getElementById("makedef").value = "DEFAULT";
        toast("Item added successfully");
      })
      .catch((err) => {
        // console.log(err)
        toast.error(err.response?.data?.message || err.message);
      });
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
                <img
                  src={profile_picture.src}
                  alt="User Profile Picture"
                  width={200}
                  height={200}
                  className="rounded-full aspect-square"
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
                        <select
                          id="makedef"
                          name="productId"
                          defaultValue={"DEFAULT"}
                          // value = {selectedProduct.name}
                          onChange={handleInputChange}
                          className="text-sm pl-1 text-gray-400 py-1 bg-gray-200 rounded-md w-2/3   border-2 focus:outline-none focus-within:border-blue-500 rounded-md">
                          <option
                            value="DEFAULT"
                            disabled
                            className="text-gray-400">
                            Select Product
                          </option>
                          {loadingProduct ? (
                            <option disabled>Loading Products...</option>
                          ) : (
                            productList.map((product, idx) => {
                              return (
                                <option value={product._id} key={idx}>
                                  {product.name}
                                </option>
                              );
                            })
                          )}
                        </select>
                      </div>
                      <div className="flex flex-col lg:flex-row  w-full">
                        <label className="w-1/3">Category</label>
                        {/* <input
                          value={newProduct.category}
                          placeholder={"fruits"}
                          type="text"
                          onChange={handleChange}
                          name="category"
                          className="bg-gray-200 rounded-md w-2/3 "
                        /> */}
                        <label className="bg-gray-200 rounded-md w-2/3 ">
                          {newProduct.category
                            ? newProduct.category
                            : "Select Product First"}
                        </label>
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
                          className={
                            newProduct.category
                              ? "bg-gray-200 rounded-md w-1/2 "
                              : "bg-gray-200 rounded-md w-2/3 "
                          }
                        />
                        {newProduct.category && <label>/{newProduct.unit}</label>}
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

                      <div className="flex flex-col lg:flex-row  w-full">
                        <label className="w-1/3">Product Image</label>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          className="w-2/3 "
                          onChange={handleImageChange}
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
                            <div className="w-1/2 flex justify-around item-center">
                              <button
                                onClick={() => {
                                  handleEdit(product);
                                }}>
                                <EditOutlinedIcon />
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(product);
                                }}>
                                <DeleteOutlinedIcon />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {edit.mode && (
                  <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg">
                      <div className="bg-[#BBB] flex flex-col rounded-xl p-10 justify-center w-[400px] h-[400px] ">
                        <div className="flex flex-col gap-5 justify-start items-start w-11/12">
                          <div className="flex flex-row  w-full">
                            <span className="w-2/5">Name</span>
                            <span className="w-3/5">{edit.product.name}</span>
                          </div>
                          <div className="flex flex-row w-full  ">
                            <span className="w-2/5">Life Time</span>
                            {/* <span className="w-3/5">
                              {product.duration} days
                            </span> */}
                            <input
                              value={editProduct.duration}
                              placeholder={edit.product.duration}
                              type="text"
                              onChange={handleEditProduct}
                              name="duration"
                              className="bg-gray-200 rounded-md w-2/3 "
                            />
                          </div>
                          <div className="flex flex-row  w-full">
                            <span className="w-2/5">Price</span>
                            {/* <span className="w-3/5">{product.price}</span> */}
                            <input
                              value={editProduct.price}
                              placeholder={edit.product.price}
                              type="text"
                              onChange={handleEditProduct}
                              name="price"
                              className="bg-gray-200 rounded-md w-2/3 "
                            />
                          </div>
                          <div className="flex flex-row w-full ">
                            <span className="w-2/5">Discount</span>
                            {/* <span className="w-3/5">{product.discount}%</span> */}
                            <input
                              value={editProduct.discount}
                              placeholder={edit.product.discount}
                              type="text"
                              onChange={handleEditProduct}
                              name="discount"
                              className="bg-gray-200 rounded-md w-2/3 "
                            />
                          </div>
                          <div className="w-full flex justify-around py-3">
                            <button
                              onClick={() => {
                                handleSubmitEdit(edit.product);
                              }}>
                              <SaveOutlinedIcon />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => {
                                handleCancelEdit();
                              }}>
                              <CancelOutlinedIcon />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
