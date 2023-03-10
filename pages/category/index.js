import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import StarRating from "../../components/rating";

const ProductByCategory = () => {
  const router = useRouter();
  const { category } = router.query;

  const [productByCategory, setProductByCategory] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8000/plans/getProductByCategory", {
        category: category,
      })
      .then((res) => {
        // console.log(res.data.data);
        setProductByCategory(res.data.data);
      })
      .catch((err) => {});
  }, [category]);

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/plans/getCategory").then((res) => {
      console.log(res.data.data);
      setCategoryList(res.data.data);
    });
  }, []);

  const handleCategory = (category) => {

    router.push({
      pathname : "/category",
      query : {category: category}
    })
  }
  return (
    <div>
      <Header />
      <div>
        <div className="top-div flex flex-row justify-around">
          {categoryList.map((item, idx) => {
            return (
              <div
                className="pt-2"
                onClick={() => {
                  handleCategory(item.name);
                }}>
                {item.name}
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-around gap-5 w-full my-5 p-5 bg-primary rounded-md overflow-hidden">
          {productByCategory.map((product, idx) => {
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
      </div>
      <Footer />
    </div>
  );
};

export default ProductByCategory;
