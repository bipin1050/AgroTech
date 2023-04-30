import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Verify = ({verified}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  return (
    <>
      {verified ? (
        <div className="flex flex-col h-screen w-screen">
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center p-5 text-green-500">
              <h1 className="text-4xl font-bold mb-5">
                Verification Successful!
              </h1>
              <p className="text-lg text-center mb-5">
                You have now activated your account.
              </p>
              <button
                className="bg-green-500 text-white rounded-full py-2 px-4 font-bold"
                onClick={handleClick}>
                Back to Login
              </button>
            </div>
          </div>
          <div className="w-1/2 h-full absolute left-0 top-0">
            <Confetti
              width={width}
              height={height}
              numberOfPieces={500}
              recycle={false}
              colors={["#ffffff", "#f6d365", "#fda085", "#ebebfa", "#ff1e56"]}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen w-screen">
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center p-5 text-green-500">
              <h1 className="text-4xl font-bold mb-5">
                Verification Failed!
              </h1>
              <p className="text-lg text-center mb-5">
                There is an error in account activation phase. Try contacting US.
              </p>
            </div>
          </div>=
        </div>
      )}
    </>
  );
};

export default Verify;
