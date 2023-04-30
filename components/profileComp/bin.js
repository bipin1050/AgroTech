import axios from "axios";
import React, { useEffect, useState } from "react";

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
      callPoint: "seeProductStatus",
      state: false,
    },
    {
      name: "Dispatched from Farm",
      key: "dispatchedFarmProducts",
      callPoint: "seeProductStatus",
      state: false,
    },
    {
      name: "Products in AgroTech",
      key: "agrotechProducts",
      callPoint: "seeProductStatus",
      state: false,
    },
    {
      name: "Dispatched from AgroTech",
      key: "dispatchedAgrotechProducts",
      callPoint: "seeProductStatus",
      state: false,
    },
    {
      name: "Delivered Products",
      key: "deliveredProducts",
      callPoint: "seeProductStatus",
      state: false,
    },
  ]);

  const [unAssignedProducts, setUnAssignedProducts] = useState(null);
  const [assignedProducts, setAssignedProducts] = useState(null);
  const [dispatchedFarmProducts, setDispatchedFarmProducts] = useState(null);
  const [agrotechProducts, setAgroTechProducts] = useState(null);
  const [dispatchedAgrotechProducts, setDispatchedAgrotechProducts] =
    useState(null);
  const [deliveredProducts, setDeliveredProducts] = useState(null);

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
  };

  useEffect(() => {
    getProducts("seeProductStatus");
  });

  const getProducts = (callPoint) => {
    axios
      .post(`http://localhost:8000/status/${callPoint}`, {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setUnAssignedProducts(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [checkCountUnassigned, setCheckCountUnassigned] = useState(0);

  //making list of product to be assigned to the trucker by admin
  const handleAddAssignList = (event) => {
    console.log(event.target.checked);
    const checkboxId = event.target.value;
    if (event.target.checked) {
      setCheckCountUnassigned(checkCountUnassigned + 1);
      setToBeAssignedList([...toBeAssignedList, checkboxId]);
    } else {
      const updatedIds = toBeAssignedList.filter((id) => id !== checkboxId);
      setToBeAssignedList(updatedIds);
      setCheckCountUnassigned(checkCountUnassigned - 1);
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

  ..............................

{isAssign && (
        <>
          <button
            className={`bg-blue-500 text-white py-2 px-4 mt-2 rounded-md ${
              checkCountUnassigned ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!checkCountUnassigned}
            onClick={handleAssign}>
            Assign to Trucker
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 self-center justify-center p-10 items-center w-full">
            {unAssignProduct.map((product, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white flex flex-col rounded-xl p-10 justify-center relative ">
                  <input
                    type="checkbox"
                    className="absolute top-0 right-0 mt-5 mr-5  w-4 h-4"
                    onChange={handleAddAssignList}
                    value={product._id}
                  />
                  <div className="flex flex-col gap-5 justify-start items-start w-11/12">
                    <div className="flex flex-row  w-full">
                      <span className="w-2/5">Name</span>
                      <span className="w-3/5">{product.productname}</span>
                    </div>
                    <div className="flex flex-row w-full ">
                      <span className="w-2/5">Quantity</span>
                      <span className="w-3/5">{product.quantity}</span>
                    </div>
                    <div className="flex flex-row w-full ">
                      <span className="w-2/5">Status</span>
                      <span className="w-3/5">{product.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {clickAssign && (
            // <div className="fixed z-50 top-0 left-0 w-full h-full flex flex-col  items-center justify-center">
            //   <div className="w-[50%] h-[50%] bg-[#d9d9d9]">
            //     <div>
            //       {availableTrucker.map((trucker, idx) => {
            //         return (
            //           <div
            //             onClick={() => {
            //               handleTruckAssign(trucker._id);
            //             }}>
            //             <h1>Name : {trucker.name}</h1>
            //             <h3>Email : {trucker.email}</h3>
            //           </div>
            //         );
            //       })}
            //     </div>
            //     <button
            //       onClick={() => {
            //         setClickAssign(false);
            //       }}>
            //       Cancel
            //     </button>
            //   </div>
            // </div>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg w-104 h-104">
                <h2 className="text-lg font-medium mb-2">Available Trucker</h2>
                {availableTrucker.map((trucker, idx) => (
                  <div key={idx} className="m-4 hover:cursor-pointer">
                    <div className="font-medium">{trucker.name}</div>
                    <div className="text-gray-600 text-sm">{trucker.email}</div>
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
      )}

      {/* Assigned but not dispatched */}
      {isFarmDispatch && (
        <>
          <button
            className={`bg-blue-500 text-white py-2 px-4 mt-2 rounded-md ${
              checkCountFarmDispatch ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!checkCountFarmDispatch}
            onClick={handleAssign}>
            Assign to Trucker
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 self-center justify-center p-10 items-center w-full">
            {farmDispatched.map((product, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white flex flex-col rounded-xl p-10 justify-center relative ">
                  <input
                    type="checkbox"
                    className="absolute top-0 right-0 mt-5 mr-5  w-4 h-4"
                    onChange={handleAddAssignList}
                    value={product._id}
                  />
                  <div className="flex flex-col gap-5 justify-start items-start w-11/12">
                    <div className="flex flex-row  w-full">
                      <span className="w-2/5">Name</span>
                      <span className="w-3/5">{product.productname}</span>
                    </div>
                    <div className="flex flex-row w-full ">
                      <span className="w-2/5">Quantity</span>
                      <span className="w-3/5">{product.quantity}</span>
                    </div>
                    <div className="flex flex-row w-full ">
                      <span className="w-2/5">Status</span>
                      <span className="w-3/5">{product.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {isFarmDispatch && (
        <>
          <button
            className={`bg-blue-500 text-white py-2 px-4 mt-2 rounded-md ${
              checkCountFarmDispatch ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!checkCountFarmDispatch}
            onClick={handleAssign}>
            Assign to Trucker
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 self-center justify-center p-10 items-center w-full">
            {farmDispatched.map((product, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white flex flex-col rounded-xl p-10 justify-center relative ">
                  <input
                    type="checkbox"
                    className="absolute top-0 right-0 mt-5 mr-5  w-4 h-4"
                    onChange={handleAddAssignList}
                    value={product._id}
                  />
                  <div className="flex flex-col gap-5 justify-start items-start w-11/12">
                    <div className="flex flex-row  w-full">
                      <span className="w-2/5">Name</span>
                      <span className="w-3/5">{product.productname}</span>
                    </div>
                    <div className="flex flex-row w-full ">
                      <span className="w-2/5">Quantity</span>
                      <span className="w-3/5">{product.quantity}</span>
                    </div>
                    <div className="flex flex-row w-full ">
                      <span className="w-2/5">Status</span>
                      <span className="w-3/5">{product.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}