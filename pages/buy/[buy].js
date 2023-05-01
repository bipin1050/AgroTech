import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Authentication/auth";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import { WindowSharp } from "@mui/icons-material";

const Buy = () => {
  const [mode, setMode] = useState(null);
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const { id, quantity, name } = router.query;
  const [isPaymentModeChecked, setIsPaymentModeChecked] = useState(false);

  const changeMode = (val) => {
    setMode(val);
    setIsPaymentModeChecked(true);
  }

  const handlePlaceOrder = () => {
    if (!mode) {
      if (confirm("Are you sure want to place the order") == true) {
        axios
          .post("http://localhost:8000/plans/buyProduct", {
            headers: {
              authorization: `${localStorage.getItem("accessToken")}`,
            },
            productid: id,
            number: quantity,
            mode: mode,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    else if (mode){
        axios
          .post("http://localhost:8000/plans/buyProduct/Khalti", {
            headers: {
              authorization: `${localStorage.getItem("accessToken")}`,
            },
            productid: id,
            number: quantity,
            mode: mode,
          })
          .then((res) => {
            localStorage.setItem("id", id);
            localStorage.setItem("quantity", quantity);
            // console.log(res.data.paymentURL);
            window.open(res.data.paymentURL, "_blank", "noreferrer");
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };


  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 my-8 px-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="text-2xl font-bold text-green-500 mb-4">
              Check Before You Proceed
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="product">
                Product : {name}
              </label>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="quantity">
                Quantity : {quantity}
              </label>
            </div>
            <div className="text-2xl font-bold text-green-500 mb-4">
              Confirm Your Credentials
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email">
                Email : {user.email}
              </label>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="paymentMethod">
                Select Payment Method
              </label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-green-500"
                    value="cashOnDelivery"
                    name="mode"
                    onChange={() => {
                      changeMode(0);
                    }}
                  />
                  <span className="ml-2 text-gray-700 font-bold">
                    Cash on Delivery
                  </span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio text-green-500"
                    value="online"
                    name="mode"
                    onChange={() => {
                      changeMode(1);
                    }}
                  />
                  <span className="ml-2 text-gray-700 font-bold">
                    Online (via. Khalti)
                  </span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isPaymentModeChecked ? "" : "opacity-50 cursor-not-allowed"
                }`}
                onClick={handlePlaceOrder}
                disabled={!isPaymentModeChecked}>
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Buy;
