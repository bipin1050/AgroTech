import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { toast } from "react-toastify";
import ProductHistory from "./productHistory";

const UserPage = () => {

  const [menuItems, setMenuItems] = useState([
    { name: "View History", key: "viewHistory", state: true },
  ]);

//   const handleTaskClick = (itemKey) => {
//     if (itemKey == "viewHistory") {
//       getProductsHistory();
//     }
//     setMenuItems((prevItems) =>
//       prevItems.map((item) => {
//         if (item.key === itemKey) {
//           return { ...item, state: true };
//         } else {
//           return { ...item, state: false };
//         }
//       })
//     );
//     // console.log(menuItems)
//   };

  const [myHistory, setMyHistory] = useState(null);

  const getProductsHistory = () => {
    axios
      .post("http://localhost:8000/status/seeProductStatus", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setMyHistory(res.data.plans);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getProductsHistory();

  return (
    <div className="flex flex-col justify-center mt-4 w-4/5">
      {/* <div className="flex justify-center">
        {menuItems.map((item, id) => (
          <span
            key={id}
            className={`px-4 py-2 rounded-md hover:cursor-pointer ${
              item.state
                ? "bg-gray-400 text-white"
                : "bg-gray-100 text-gray-700"
            } ${id !== menuItems.length - 1 ? "mr-4" : ""}`}
            // onClick={() => handleTaskClick(item.key)}
          >
            <span className="text-gray-700 hover:text-gray-900">
              {item.name}
            </span>
          </span>
        ))}
      </div> */}
      <div className="flex justify-center w-full">
        {menuItems[0].state && <ProductHistory myHistory={myHistory} />}
      </div>
    </div>
  );
};

export default UserPage;
