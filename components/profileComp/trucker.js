import axios from "axios";
import React, { useEffect, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const TruckerPage = () => {
  //for trucker product assigned list
  const [truckerProduct, setTruckerProduct] = useState(null);
  const handleTruckerHistory = () => {
    axios
      .post("http://localhost:8000/status/seeProductStatusByTrucker", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (!truckerProduct) {
          setTruckerProduct(res.data.data);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleTruckerHistory();
  }, []);

  //for trucker change status processing to dispatch
  const handleEditStatus = (id) => {
    axios.post("http://localhost:8000/status/changeProductStatus", {
      headers: {
        authorization: `${localStorage.getItem("accessToken")}`,
      },
      statusid: [id],
      status: "Product dispatched from farmer",
    });
  };

  const handleEditStatus2 = (id) => {
    axios.post("http://localhost:8000/status/changeProductStatus", {
      headers: {
        authorization: `${localStorage.getItem("accessToken")}`,
      },
      statusid: [id],
      status: "Product delivered",
    });
  };
  return (
    <div className="flex flex-col gap-5 items-center w-11/12 lg:w-4/5 m-5">
      {!truckerProduct ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 self-center justify-center p-10 items-center w-full">
          {truckerProduct.map((product, idx) => {
            return (
              <div
                key={idx}
                className="bg-white flex flex-col rounded-xl p-10 justify-center  ">
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
                    {product.status == "Trucker Assigned" && (
                      <button
                        onClick={() => {
                          handleEditStatus(product._id);
                        }}>
                        <EditOutlinedIcon />
                      </button>
                    )}
                    {product.status == "Product dispatched from Agrotech" && (
                      <button
                        onClick={() => {
                          handleEditStatus2(product._id);
                        }}>
                        <EditOutlinedIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TruckerPage;
