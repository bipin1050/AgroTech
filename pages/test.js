import axios from "axios";
import React, { useEffect } from "react";

const test = () => {
  //to fetch processing/umassigned product
  //   useEffect(() => {
  //     axios
  //       .post("http://localhost:8000/status/seeProcessingStatus", {
  //         headers: {
  //           authorization: `${localStorage.getItem("accessToken")}`,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });

  // show the product with status id "Trucker Assigned"

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:8000/status/seeTruckAssigned", {
  //       headers: {
  //         authorization: `${localStorage.getItem("accessToken")}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

  //shows the dispatched products from the farmer but not recieved
  // useEffect(() => {
  //   axios
  //     .post("http://localhost:8000/status/seeProductDispatchedFromFarmer", {
  //       headers: {
  //         authorization: `${localStorage.getItem("accessToken")}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

  
  useEffect(() => {
    axios
      .post("http://localhost:8000/status/seeProductDispatchedFromFarmer", {
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
  });

  return <div>hello</div>;
};

export default test;
