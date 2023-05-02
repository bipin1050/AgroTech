import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminPage = () => {
  const [menuItems, setMenuItems] = useState([
    {
      name: "Unassigned Products",
      key: "unAssignedProducts",
      callPoint: "seeProductStatus",
      state: true,
    },
    {
      name: "Assigned Products",
      key: "assignedProducts",
      callPoint: "seeTruckAssigned",
      state: false,
    },
    {
      name: "Dispatched from Farm",
      key: "dispatchedFarmProducts",
      callPoint: "seeProductDispatchedFromFarmer",
      state: false,
    },
    {
      name: "Products in AgroTech",
      key: "agrotechProducts",
      callPoint: "seeProductInAgrotech",
      state: false,
    },
    {
      name: "Dispatched from AgroTech",
      key: "dispatchedAgrotechProducts",
      callPoint: "seeProductDispatchedFromAgrotech",
      state: false,
    },
    {
      name: "Delivered Products",
      key: "deliveredProducts",
      callPoint: "seeProductDelivered",
      state: false,
    },
  ]);

  const [products, setProducts] = useState(null);

  const handleTaskClick = (callPoint, itemKey) => {
    //reset the value

    setCheckCount(0);
    setProductList([]);
    setClickAssign(false);
    setAvailbleTrucker([]);

    setMenuItems((prevItems) =>
      prevItems.map((item) => {
        if (item.key === itemKey) {
          return { ...item, state: true };
        } else {
          return { ...item, state: false };
        }
      })
    );
    // console.log(callPoint)
    getProducts(callPoint);
  };

  useEffect(() => {
    getProducts("seeProductStatus");
  }, []);

  const getProducts = (callPoint) => {
    // console.log(callPoint)
    setProducts(null);
    axios
      .post(`http://localhost:8000/status/${callPoint}`, {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setProducts(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [checkCount, setCheckCount] = useState(0);
  const [productList, setProductList] = useState([]); //list of items to be assigned to specific trucker

  //making list of product to be assigned to the trucker by admin
  const handleProductAssign = (event) => {
    console.log(event.target.checked);
    const checkboxId = event.target.value;
    if (event.target.checked) {
      setCheckCount(checkCount + 1);
      setProductList([...productList, checkboxId]);
    } else {
      const updatedIds = productList.filter((id) => id !== checkboxId);
      setProductList(updatedIds);
      setCheckCount(checkCount - 1);
    }
  };

  const [clickAssign, setClickAssign] = useState(false); //once clicked will show list of available trucker
  const [availableTrucker, setAvailbleTrucker] = useState([]); //list of available truckers

  //fetch available trucker list by admin
  const handleAssign = () => {
    setClickAssign(true);
    axios
      .post("http://localhost:8000/status/seeOnlineTruckerStatus", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setAvailbleTrucker(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //assigning a list of products to a farmer
  const handleTruckAssign = (id) => {
    // console.log(toBeAssignedList);
    axios
      .post("http://localhost:8000/status/assignTrucker", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
        statusId: productList,
        truckerId: id,
      })
      .then((res) => {
        console.log(res);
        setClickAssign(false);
        setCheckCount(0);
        toast("Items assigned successfully");
        getProducts("seeProductStatus")
      })
      .catch((err) => {
        console.log(err);
        setClickAssign(false);
      });
  };

  //below is the functions to marked the products that are received in the agrotech from the trucker

  const handleReceive = () => {
    console.log(productList);
    axios
      .post("http://localhost:8000/status/changeProductStatus", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
        statusid: productList,
        status: "Product in Agrotech",
      })
      .then((res) => {
        console.log(res);
        setCheckCount(0);
        toast("Items received successfully");
        getProducts("seeProductDispatchedFromFarmer");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Below is the function to assign the items to the trucker where product is in agrotech

  const handleTruckAssign2 = (id) => {
    // console.log(toBeAssignedList);
    axios
      .post("http://localhost:8000/status/assignTrucker2", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
        statusId: productList,
        truckerId: id,
      })
      .then((res) => {
        console.log(res);
        setClickAssign(false);
        setCheckCount(0);
        toast("Items assigned successfully");
        getProducts("seeProductInAgrotech");
      })
      .catch((err) => {
        console.log(err);
        setClickAssign(false);
      });
  };

  return (
    <div className="flex flex-col gap-5 items-center w-11/12 lg:w-4/5 m-5">
      <div className="flex justify-center">
        {menuItems.map((item, id) => (
          <span
            key={id}
            className={`px-4 py-2 rounded-md text-center hover:cursor-pointer ${
              item.state
                ? "bg-gray-400 text-white"
                : "bg-gray-100 text-gray-700"
            } ${id !== menuItems.length - 1 ? "mr-4" : ""}`}
            onClick={() => handleTaskClick(item.callPoint, item.key)}>
            <span className="">{item.name}</span>
          </span>
        ))}
      </div>
      {/* Unassigned Product */}
      {menuItems[0].state &&
        (!products ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="self-center justify-center p-10 items-center w-full">
              <table className="w-full box-shadow divide-y divide-gray-200 border border-gray-200">
                <thead>
                  <tr
                    className=" text-white"
                    style={{ backgroundColor: "#3E9B05" }}>
                    <th className="p-2 text-left">Select</th>
                    <th className="p-2 text-left">S.N.</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="p-2">
                          <input
                            type={"checkbox"}
                            // className="text-[#3E9B05]"
                            style={{ accentColor: "#3E9B05" }}
                            onChange={handleProductAssign}
                            value={product._id}
                          />
                        </td>
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{product.productname}</td>
                        <td className="p-2">{product.quantity}</td>
                        <td className="p-2">{product.status}</td>
                      </tr>
                    );
                  })}
                  {!products.length && (
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
            </div>
            {products.length > 0 && (
              <button
                className={`bg-blue-500 text-white py-2 px-4 mt-2 rounded-md ${
                  checkCount ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!checkCount}
                onClick={handleAssign}>
                Assign to Trucker
              </button>
            )}
            {clickAssign && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg w-104 h-104">
                  <h2 className="text-lg font-medium mb-2">
                    Available Trucker
                  </h2>
                  {availableTrucker.map((trucker, idx) => (
                    <div
                      key={idx}
                      className="m-4 hover:cursor-pointer"
                      onClick={() => {
                        handleTruckAssign(trucker._id);
                      }}>
                      <div className="font-medium">{trucker.name}</div>
                      <div className="text-gray-600 text-sm">
                        {trucker.email}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setClickAssign(false);
                    }}
                    className=" w-full items-center">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        ))}

      {/* Assigned Products */}
      {menuItems[1].state &&
        (!products ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="self-center justify-center p-10 items-center w-full">
              <table className="w-full box-shadow divide-y divide-gray-200 border border-gray-200">
                <thead>
                  <tr
                    className=" text-white"
                    style={{ backgroundColor: "#3E9B05" }}>
                    {/* <th className="p-2 text-left">Select</th> */}
                    <th className="p-2 text-left">S.N.</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product, idx) => {
                    return (
                      <tr key={idx}>
                        {/* <td className="p-2">
                          <input
                            type={"checkbox"}
                            // className="text-[#3E9B05]"
                            style={{ accentColor: "#3E9B05" }}
                          />
                        </td> */}
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{product.productname}</td>
                        <td className="p-2">{product.quantity}</td>
                        <td className="p-2">{product.status}</td>
                      </tr>
                    );
                  })}
                  {!products.length && (
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
            </div>
          </>
        ))}

      {/* Dispatched From Farm */}
      {menuItems[2].state &&
        (!products ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="self-center justify-center p-10 items-center w-full">
              <table className="w-full box-shadow divide-y divide-gray-200 border border-gray-200">
                <thead>
                  <tr
                    className=" text-white"
                    style={{ backgroundColor: "#3E9B05" }}>
                    <th className="p-2 text-left">Select</th>
                    <th className="p-2 text-left">S.N.</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="p-2">
                          <input
                            type={"checkbox"}
                            // className="text-[#3E9B05]"
                            style={{ accentColor: "#3E9B05" }}
                            onChange={handleProductAssign}
                            value={product._id}
                          />
                        </td>
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{product.productname}</td>
                        <td className="p-2">{product.quantity}</td>
                        <td className="p-2">{product.status}</td>
                      </tr>
                    );
                  })}
                  {!products.length && (
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
            </div>
            {products.length > 0 && (
              <button
                className={`bg-blue-500 text-white py-2 px-4 mt-2 rounded-md ${
                  checkCount ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!checkCount}
                onClick={handleReceive}>
                Mark Received
              </button>
            )}
          </>
        ))}

      {/* Product in AgroTech */}
      {menuItems[3].state &&
        (!products ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="self-center justify-center p-10 items-center w-full">
              <table className="w-full box-shadow divide-y divide-gray-200 border border-gray-200">
                <thead>
                  <tr
                    className=" text-white"
                    style={{ backgroundColor: "#3E9B05" }}>
                    <th className="p-2 text-left">Select</th>
                    <th className="p-2 text-left">S.N.</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="p-2">
                          <input
                            type={"checkbox"}
                            // className="text-[#3E9B05]"
                            style={{ accentColor: "#3E9B05" }}
                            onChange={handleProductAssign}
                            value={product._id}
                          />
                        </td>
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{product.productname}</td>
                        <td className="p-2">{product.quantity}</td>
                        <td className="p-2">{product.status}</td>
                      </tr>
                    );
                  })}
                  {!products.length && (
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
            </div>
            {products.length > 0 && (
              <button
                className={`bg-blue-500 text-white py-2 px-4 mt-2 rounded-md ${
                  checkCount ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!checkCount}
                onClick={handleAssign}>
                Assign to Trucker
              </button>
            )}
            {clickAssign && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg w-104 h-104">
                  <h2 className="text-lg font-medium mb-2">
                    Available Trucker
                  </h2>
                  {availableTrucker.map((trucker, idx) => (
                    <div
                      key={idx}
                      className="m-4 hover:cursor-pointer"
                      onClick={() => {
                        handleTruckAssign2(trucker._id);
                      }}>
                      <div className="font-medium">{trucker.name}</div>
                      <div className="text-gray-600 text-sm">
                        {trucker.email}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setClickAssign(false);
                    }}
                    className=" w-full items-center">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        ))}

      {/* Product dispatched from Agrotech */}
      {menuItems[4].state &&
        (!products ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="self-center justify-center p-10 items-center w-full">
              <table className="w-full box-shadow divide-y divide-gray-200 border border-gray-200">
                <thead>
                  <tr
                    className=" text-white"
                    style={{ backgroundColor: "#3E9B05" }}>
                    {/* <th className="p-2 text-left">Select</th> */}
                    <th className="p-2 text-left">S.N.</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product, idx) => {
                    return (
                      <tr key={idx}>
                        {/* <td className="p-2">
                        <input
                          type={"checkbox"}
                          // className="text-[#3E9B05]"
                          style={{ accentColor: "#3E9B05" }}
                          onChange={handleProductAssign}
                          value={product._id}
                        />
                      </td> */}
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{product.productname}</td>
                        <td className="p-2">{product.quantity}</td>
                        <td className="p-2">{product.status}</td>
                      </tr>
                    );
                  })}
                  {!products.length && (
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
            </div>
            {clickAssign && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg w-104 h-104">
                  <h2 className="text-lg font-medium mb-2">
                    Available Trucker
                  </h2>
                  {availableTrucker.map((trucker, idx) => (
                    <div
                      key={idx}
                      className="m-4 hover:cursor-pointer"
                      onClick={() => {
                        handleTruckAssign(trucker._id);
                      }}>
                      <div className="font-medium">{trucker.name}</div>
                      <div className="text-gray-600 text-sm">
                        {trucker.email}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setClickAssign(false);
                    }}
                    className=" w-full items-center">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        ))}

      {/* Product Delivered */}
      {menuItems[5].state &&
        (!products ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="self-center justify-center p-10 items-center w-full">
              <table className="w-full box-shadow divide-y divide-gray-200 border border-gray-200">
                <thead>
                  <tr
                    className=" text-white"
                    style={{ backgroundColor: "#3E9B05" }}>
                    {/* <th className="p-2 text-left">Select</th> */}
                    <th className="p-2 text-left">S.N.</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product, idx) => {
                    return (
                      <tr key={idx}>
                        {/* <td className="p-2">
                        <input
                          type={"checkbox"}
                          // className="text-[#3E9B05]"
                          style={{ accentColor: "#3E9B05" }}
                          onChange={handleProductAssign}
                          value={product._id}
                        />
                      </td> */}
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{product.productname}</td>
                        <td className="p-2">{product.quantity}</td>
                        <td className="p-2">{product.status}</td>
                      </tr>
                    );
                  })}
                  {!products.length && (
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
            </div>
          </>
        ))}
    </div>
  );
};

export default AdminPage;
