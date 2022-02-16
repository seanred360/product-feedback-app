import { useEffect, useState } from "react";
import useAxios from "../../custom-hooks/useAxios";
import Menu from "../Menu";
import RenderAllFeedback from "../RenderAllFeedback";
import PageSpinner from "../common/PageSpinner";

const HomePage = () => {
  const [feedbackPosts, setFeedbackPosts] = useState();
  const [filteredFeedback, setFilteredFeedback] = useState();

  const { response, loading, error, controller } = useAxios({
    method: "get",
    url: process.env.REACT_APP_MONGO_URL,
  });

  useEffect(() => {
    if (response !== null) {
      setFeedbackPosts(response);
      setFilteredFeedback(response);
    }
    return () => {
      //if the ajax call doesn't finish before we unmount, cancel it
      controller.abort();
    };
  }, [response, controller]);

  if (loading) return <PageSpinner />;
  if (error) return <strong>{error.message}</strong>;
  return (
    <>
      <Menu dataToSort={feedbackPosts} setData={setFilteredFeedback} />
      <div className="home-page">
        <RenderAllFeedback feedbackPosts={filteredFeedback} />
      </div>
    </>
  );
};

export default HomePage;
