import { useEffect, useState } from "react";
import useAxios from "../../custom-hooks/useAxios";
import Menu from "../Menu";
import RenderAllFeedback from "../RenderAllFeedback";
import Spinner from "../common/Spinner";

const HomePage = () => {
  const [feedbackPosts, setFeedbackPosts] = useState();

  const { response, loading, error } = useAxios({
    method: "get",
    url: process.env.REACT_APP_MONGO_URL,
  });

  useEffect(() => {
    if (response !== null) {
      setFeedbackPosts(response);
    }
  }, [response]);

  if (loading) return <Spinner />;
  if (error) return <strong>{error.message}</strong>;
  return (
    <>
      <Menu dataToSort={feedbackPosts} setData={setFeedbackPosts} />
      <div className="home-page">
        <RenderAllFeedback feedbackPosts={feedbackPosts} />
      </div>
    </>
  );
};

export default HomePage;
