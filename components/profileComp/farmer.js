import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { toast } from "react-toastify";
import ProductHistory from "./productHistory";

const FarmerPage = () => {
  const router = useRouter();

  useEffect(() => {
    getProducts();
  }, []);

  const [menuItems, setMenuItems] = useState([
    { name: "View Products", key: "viewProduct", state: true },
    { name: "Add Product", key: "addProduct", state: false },
    { name: "View History", key: "viewHistory", state: false },
  ]);

  const handleTaskClick = (itemKey) => {
    if (itemKey == "addProduct") {
      getProductList();
    } else if (itemKey == "viewProduct") {
      getProducts();
    } else if (itemKey == "viewHistory") {
      getProductsHistory();
    }
    setMenuItems((prevItems) =>
      prevItems.map((item) => {
        if (item.key === itemKey) {
          return { ...item, state: true };
        } else {
          return { ...item, state: false };
        }
      })
    );
    // console.log(menuItems)
  };

  //viewProduct Segment
  const [myProduct, setMyProduct] = useState(null);

  const getProducts = () => {
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
        console.log(err);
      });
  };

  //edit Product inside viewProduct
  const [edit, setEdit] = useState({ mode: false, product: {} });
  const [editProduct, setEditProduct] = useState({});

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
          setEdit((prevState) => ({
            ...prevState,
            mode: false,
            product: {},
          }));
          setEditProduct({});
          getProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCancelEdit = () => {
    setEdit((prevState) => ({
      ...prevState,
      mode: false,
      product: {},
    }));
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

  //addProduct Segment

  const [productList, setProductList] = useState(null); //holds every product available, name to add new product

  const getProductList = () => {
    axios
      .post("http://localhost:8000/plans/productList", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.product);
        setProductList(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //is a variable used to hold data, if farmer adds a new product
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

  const handleInputChange = (e) => {
    setNewProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setNewProduct((prevState) => ({
      ...prevState,
      category: null,
      unit: null,
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
          unit: res.data.category.unit,
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

  const handleChange = (e) => {
    setNewProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
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

  const [myHistory, setMyHistory] = useState(null);

  const getProductsHistory = () => {
    axios
      .post("http://localhost:8000/status/seeProductStatus", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setMyHistory(res.data.plans);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center mt-4 w-4/5">
      <div className="flex justify-center">
        {menuItems.map((item, id) => (
          <span
            key={id}
            className="mx-4"
            onClick={() => handleTaskClick(item.key)}>
            <span className="text-gray-700 hover:text-gray-900">
              {item.name}
            </span>
          </span>
        ))}
      </div>
      <div className="flex justify-center w-full">
        {menuItems[0].state && (
          <div className="self-center justify-center p-10 items-center w-full">
            {!myProduct ? (
              <div>Loading...</div>
            ) : (
              <table className="w-full box-shadow divide-y divide-gray-200 border border-gray-200">
                <thead>
                  <tr
                    className=" text-white"
                    style={{ backgroundColor: "#3E9B05" }}>
                    <th className="p-2 text-left">Select</th>
                    <th className="p-2 text-left">S.N.</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Life Time</th>
                    <th className="p-2 text-left">Price</th>
                    <th className="p-2 text-left">Discount</th>
                    <th className="p-2 text-left">Edit/Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {myProduct.map((product, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="p-2">
                          <input
                            type={"checkbox"}
                            // className="text-[#3E9B05]"
                            style={{ accentColor: "#3E9B05" }}
                          />
                        </td>
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">{product.duration}</td>
                        <td className="p-2">{product.price}</td>
                        <td className="p-2">{product.discount}</td>
                        <td>
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
                        </td>
                      </tr>
                    );
                  })}
                  {!myProduct.length && (
                    <tr>
                      <td className="p-2" colSpan={7}>
                        <p className="text-sm text-center text-gray-500">
                          No records found
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
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

        {menuItems[1].state && (
          <div className="bg-white flex  flex-col rounded-xl p-10 justify-center py-10 w-1/2">
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
                  <option value="DEFAULT" disabled className="text-gray-400">
                    Select Product
                  </option>
                  {!productList ? (
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
                <label className="bg-gray-200 rounded-md w-2/3 ">
                  {newProduct.category
                    ? newProduct.category
                    : newProduct.category === null
                    ? "Loading..."
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
                  className={
                    newProduct.category
                      ? "bg-gray-200 rounded-md w-1/2 "
                      : "bg-gray-200 rounded-md w-2/3 "
                  }
                />
                {newProduct.category && <label>/{newProduct.unit}</label>}
              </div>

              <div className="flex flex-col lg:flex-row  w-full">
                <label className="w-1/3">Quantity</label>
                <input
                  value={newProduct.quantity}
                  placeholder={"100"}
                  type="text"
                  onChange={handleChange}
                  name="quantity"
                  className="bg-gray-200 rounded-md w-2/3 "
                />
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

        {menuItems[2].state && <ProductHistory myHistory={myHistory} />}
      </div>
    </div>
  );
};

export default FarmerPage;
