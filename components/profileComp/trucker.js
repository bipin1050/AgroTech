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
        setTruckerProduct(res.data.data);
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
                <th className="p-2 text-left">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {truckerProduct.map((product, idx) => {
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
                    <td>
                      <div className="w-1/2 flex justify-around item-center">
                        {product.status == "Trucker Assigned" && (
                          <button
                            onClick={() => {
                              handleEditStatus(product._id);
                            }}>
                            <EditOutlinedIcon />
                          </button>
                        )}
                        {product.status ==
                          "Product dispatched from Agrotech" && (
                          <button
                            onClick={() => {
                              handleEditStatus2(product._id);
                            }}>
                            <EditOutlinedIcon />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!truckerProduct.length && (
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
      )}
    </div>
  );
};

export default TruckerPage;
