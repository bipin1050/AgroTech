import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { AuthContext } from "../Authentication/auth";
import { useRouter } from "next/router";
import { useContext } from "react";
import StarRating from "../components/rating";
import Footer from "../components/Footer";

const Cart = () => {
  const router = useRouter();

  const { user, isLoading } = useContext(AuthContext);

  // Redirect the user to the login page if they are not logged in
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!user) {
    router.push("/login");
    return null;
  }

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8000/plans/getCart", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setCartItems(res.data.products);
        console.log(res.data.products);
      })
      .catch((err) => {
        // console.log("Error while fetching products form the server")
        console.log(err);
      });
  }, []);

  const handleRemoveFromCart = (id) => {
    axios
      .post(`http://localhost:8000/plans/deleteCart/${id}`, {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProductDetails = (id) => {
    // router.push(`/products/${id}`)
    router.push({
      pathname: `/products/${id}`,
      query: { id: id },
    });
  };

  return (
    <>
      <Head>
        <title>View Cart | AgroTech</title>
        <meta name="description" content="Profile Page for Agro App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-wrap justify-around gap-5 w-full mb-5 p-5 bg-gray-100 shadow-[0px_1px_6px_1px_rgba(0,0,0,0.35)] rounded-md overflow-hidden">
        {cartItems &&
          cartItems.map((product, idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  handleProductDetails(product._id);
                }}
                className="flex flex-wrap w-[18%] justify-center relative rounded-md bg-white shadow-[0px_1px_6px_1px_rgba(0,0,0,0.15)] transition ease-in-out delay-350 hover:shadow-[0px_1px_3px_1px_rgba(0,0,0,0.65)] py-2">
                <div className="p-1 w-full">
                  <img
                    className="block object-cover object-center rounded-lg h-[150px] w-full"
                    src={`http://localhost:8000/images/${product.image}`}
                  />
                </div>

                <div className="flex flex-col justify-between w-full p-3">
                  <span className="text-xl font-medium">{product.name}</span>
                  {/* <div className="absolute right-2 rounded-md bg-[#fff] px-2">
                  <span>{product.ratingsAverage}</span>
                  <StarSharpIcon style={{ color: "yellow" }} />
                </div> */}
                  <p className="text-md font-light">
                    Rs. {(product.price * (100 - product.discount)) / 100} /{" "}
                    {product.unit}
                  </p>
                  {product.discount > 0 && (
                    <div className="flex flex-row text-gray-400">
                      <p className="line-through">{product.price}</p>
                      <p className="px-2">-{product.discount}%</p>
                    </div>
                  )}
                  <StarRating count={product.ratingsAverage} />
                </div>
                <div className="flex flex-row justify-center gap-3 rounded-3xl bg-cyan-500 p-3 cursor-pointer">
                  <button
                    className=""
                    onClick={() => {
                      handleRemoveFromCart(product._id);
                    }}>
                    Remove from Cart <AddShoppingCartIcon />
                  </button>
                  {/* <AddShoppingCartIcon /> */}
                </div>
              </div>
            );
          })}
        {cartItems.length === 0 && (
          <div className="text-center my-4">
            <p className="text-lg font-medium text-gray-700">
              Sorry, no products found.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Cart;
