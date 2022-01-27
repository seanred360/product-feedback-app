import { useEffect, useState } from "react";
import useAxios from "../../custom-hooks/useAxios";
import Menu from "../Menu";
import Feed from "../Feed";
import Spinner from "../common/Spinner";

const HomePage = () => {
  const [productRequests, setProductRequests] = useState();

  const { response, loading, error } = useAxios({
    method: "get",
    url: "https://product-feedback-rest-api.herokuapp.com/productrequests",
  });

  useEffect(() => {
    if (response !== null) {
      setProductRequests(response);
    }
  }, [response]);

  if (loading) return <Spinner />;
  if (error) return <strong>{error.message}</strong>;
  return (
    <>
      <Menu dataToSort={productRequests} setData={setProductRequests} />
      <div className="home-page">
        <Feed productRequests={productRequests} />
      </div>
    </>
  );
};

export default HomePage;
