import { useRouter } from "next/router";
import Verify from "../../components/verify";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import axios from "axios";

const Verification = () => {
  const router = useRouter();
  const { id } = router.query;

  const [verified, setVerified] = useState(false);
  const [res, setRes] = useState(null);

  useEffect(() => {
    id && axios
      .get(`http://localhost:8000/user/verify/${id}`)
      .then((res) => {
        console.log(res);
        setRes("done");
        setVerified(true);
      })
      .catch((err) => {
        setRes("done");
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      {/* {verified ? <Verify /> : res ? <p>Failed to Verify</p> : <Loading />} */}
      {res ? (verified? <Verify verified={true}/> :<Verify verified={false} />) :<Loading />}
    </div>
  );
};

export default Verification;
