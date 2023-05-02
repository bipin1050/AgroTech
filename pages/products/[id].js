import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import StarSharpIcon from "@mui/icons-material/StarSharp";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Head from "next/head";
import StarRating from "../../components/rating";
import { AuthContext } from "../../Authentication/auth";
import { toast } from "react-toastify";

// const [product, setProduct] = useState([]);

// export const getStaticProps = async () => {

// }

const ProductDetails = () => {
  const [product, setProduct] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  const { id } = router.query;

  const { user } = useContext(AuthContext);
  // console.log(id)
  // console.log(router.query.id)
  useEffect(() => {
    axios
      .get(`http://localhost:8000/plans/plan/${id}`)
      .then((res) => {
        // console.log(res);
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/review/planReview/${id}`)
      .then((res) => {
        setProductReviews(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleSubQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddCart = () => {
    axios
      .post("http://localhost:8000/plans/addCart", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
        productid: id,
      })
      .then((res) => {
        toast("Item added to Cart");
        console.log(res);
      })
      .catch((err) => {
        //this conditional error display is not efficient method
        if(err.message == "Network Error"){
          toast.error(err.message)
        }else{
          toast.error("Item Already in Cart")
        }
        console.log(err);
      });
  };
  const initiateBuy = () => {
    if(!user){
      toast.error("Login before Buying")
      router.push('/login')
    }
    router.push({
      pathname: `/buy/${id}`,
      query: {
        id: id,
        quantity: quantity,
        name : product.name
      },
    });
  };

  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit review data to backend or perform other actions
    axios
      .post(`http://localhost:8000/review/crud/${id}`, {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
        rating: rating,
        review: reviewMessage,
      })
      .then((res) => {
        setRating(0);
        setReviewMessage("");
        console.log(res);
        fetchReview ? setFetchReview(false) : setFetchReview(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Head>
        <title>Products | {product.name}</title>
        <meta name="description" content="Agro tech - shop fresh here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:w-2/5 px-4">
            <img
              src={`http://localhost:8000/images/${product.image}`}
              alt={product.name}
              className="w-80 h-80 object-cover"
            />
          </div>
          <div className="md:w-3/5 px-4 mt-4 md:mt-0">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <StarRating count={product.ratingsAverage} />
            </div>
            <p className="text-gray-700 text-2xl font-semibold mb-4">
              Rs. {Math.ceil((product.price * (100 - product.discount)) / 100)} /{" "}
              {product.unit}
            </p>
            {product.discount > 0 && (
              <div className="flex flex-row text-gray-400 font-md">
                <p className="line-through">{product.price}</p>
                <p className="px-2">-{product.discount}%</p>
              </div>
            )}
            <div className="my-2">
              Quantity :
              <button onClick={handleSubQuantity}>
                <IndeterminateCheckBoxIcon style={{ color: "gray" }} />
              </button>
              {quantity}
              <button onClick={handleAddQuantity}>
                <AddBoxIcon style={{ color: "gray" }} />
              </button>
            </div>
            <button
              onClick={handleAddCart}
              className="bg-[#2B7100] w-48 text-white py-2 px-6 shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out mb-4">
              Add to Cart
            </button>
            <button
              onClick={() => {
                initiateBuy();
              }}
              className="bg-[#FF5732] w-48 text-white mx-2 py-2 px-6 shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out mb-4">
              Buy Now
            </button>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[90%] mx-auto">
        <form onSubmit={handleSubmit} className="w-2/5 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
          <div className="flex items-center mb-4">
            <span className="text-lg font-bold mr-2">Rating:</span>
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`text-3xl ${
                  rating >= value ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(value)}>
                ★
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label
              htmlFor="reviewMessage"
              className="block text-lg font-bold mb-2">
              Review Message:
            </label>
            <textarea
              id="reviewMessage"
              name="reviewMessage"
              rows="4"
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your review here..."
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Submit Review
          </button>
        </form>
        <div className="w-2/5 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <div className="">
            {productReviews.map((review, id) => {
              if (review.review) {
                return (
                  <div key={id} className="border p-4 rounded-md w-full">
                    <p className="text-gray-400 text-sm">
                      {review.createdAt.slice(0, 10)}
                    </p>
                    <div className="flex items-center mb-2">
                      <StarRating count={review.rating} />
                    </div>
                    <p className="text-lg font-bold mb-2">{review.review}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      {/* <div>Related Products</div> */}
      <Footer />
    </div>
  );
};

export default ProductDetails;
