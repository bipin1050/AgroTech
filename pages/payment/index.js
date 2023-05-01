import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import AgrotechLogo from "../../assets/img/logo.png";
import KhaltiLogo from "../../assets/img/khalti-logo.svg";

const Logo = () => (
  <div className="w-full">
    <div className="flex justify-center items-center">
      <img src={AgrotechLogo.src} alt="Agrotech Logo" className="h-32 my-4" />
    </div>
  </div>
);

const Emoji = ({ symbol }) => (
  <span role="img" aria-label={symbol}>
    {symbol}
  </span>
);

const PaymentConfirmation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //   const [transaction, setTransaction] = useState(null);
  const router = useRouter();

  const { productid, number } = router.query;
  

console.log( productid, number);

  useEffect(() => {
    // if (pidx) {
      axios
        .post("http://localhost:8000/plans/buyProduct", {
          headers: {
            authorization: `${localStorage.getItem("accessToken")}`,
          },
          productid: productid,
          quantity: number,
          mode: 1,
        })
        .then((response) => {
          setIsLoading(false);
          setIsSuccess(true);
          //   setTransaction(response.data);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsSuccess(false);
          setErrorMessage("Something went wrong, please try again later.");
          console.log(error);
        });
    // } else {
      // setIsLoading(false);
      // setIsSuccess(false);
      // setErrorMessage("Invalid transaction details.");
    
  }, [router.query]);

  return (
    <>
      <div>
        <Logo />
      </div>
      <div className="mt-28 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold pb-2">Payment Confirmation</h1>
        <div className="bg-white rounded-lg shadow-lg p-10 max-w-3xl w-full">
          {isLoading && (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">
                Processing Payment <Emoji symbol="⏳" />
              </h1>
              <p>Please wait while we confirm your payment</p>
            </div>
          )}

          {!isLoading && isSuccess && (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">
                Payment Confirmed <Emoji symbol="🎉" />
              </h1>
              <p>Thank you for your purchase.</p>
              <div className="bg-green-500 text-white mt-6 py-3 px-6 rounded-lg inline-block">
                <p className="font-semibold">Transaction ID:</p>
                <p className="font-bold">{pidx}</p>
              </div>
            </div>
          )}

          {!isLoading && !isSuccess && (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">
                Payment Failed <Emoji symbol="😞" />
              </h1>
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50 text-gray-500 flex justify-center items-center">
            <p className="text-center">Powered by</p>
            <img
              src={KhaltiLogo.src}
              alt="Khalti Logo"
              className="h-6 ml-2"
              onClick={()=>{window.open("https://www.khalti.com")}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentConfirmation;
