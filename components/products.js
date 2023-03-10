import React, { useEffect, useState } from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/router";

import StarRating from './rating';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/plans/allPlans/${pageNo}`)
      .then((res) => {
        setProducts(res.data.data);
        setPageCount(Math.ceil(res.data.totalcount));
        console.log(res.data);
      })
      .catch(() => {
        console.log("Error while fetching products form the server");
      });
  }, [pageNo]);

  const handleProductDetails = (id) => {
    // router.push(`/products/${id}`)
    router.push({
      pathname: `/products/${id}`,
      query: { id: id },
    });
  };

  const handlePrevPage = () => {
    setPageNo(pageNo - 1);
  };
  const handleNextPage = () => {
    setPageNo(pageNo + 1);
  };

  return (
    <>
      <div className="flex flex-wrap justify-around gap-5 w-full my-5 p-5 bg-primary rounded-md overflow-hidden">
        {products.map((product, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                handleProductDetails(product._id);
              }}
              className="flex flex-wrap w-[18%] justify-center relative rounded-md bg-[#EFEFEF] transition ease-in-out delay-350 hover:shadow-[0px_1px_3px_1px_rgba(0,0,0,0.65)] py-2">
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
                  Rs. {(product.price * (100 - product.discount)) / 100} per
                  unit
                </p>
                {product.discount > 0 && (
                  <div className="flex flex-row text-gray-400">
                    <p className="line-through">{product.price}</p>
                    <p className="px-2">-{product.discount}%</p>
                  </div>
                )}
                <StarRating count={4.5} />
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {pageNo !== 0 && (
          <button onClick={handlePrevPage}>
            <KeyboardArrowLeftIcon />
          </button>
        )}
        <span>{pageNo + 1}</span>
        {pageCount - pageNo !== 1 && (
          <button onClick={handleNextPage}>
            <KeyboardArrowRightIcon />
          </button>
        )}
      </div>
    </>
  );
};

export default Products;
