import { useEffect, useState } from "react";
import useAxios from "../../custom-hooks/useAxios";
import Menu from "../Menu";
import RenderAllFeedback from "../RenderAllFeedback";
import PageSpinner from "../common/PageSpinner";
import Logo from "../common/Logo";
import WidgetUser from "../widgets/WidgetUser";
import WidgetSelectCategory from "..//widgets/WidgetSelectCategory";
import WidgetRoadMap from "../widgets/WidgetRoadMap";
import ToolBar from "../ToolBar";

const HomePage = () => {
  const [feedbackPosts, setFeedbackPosts] = useState();
  const [filteredFeedback, setFilteredFeedback] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
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

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 576);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => {
      window.removeEventListener("resize", updateMedia);
    };
  });

  if (loading) return <PageSpinner />;
  if (error) return <strong>{error.message}</strong>;
  return (
    <>
      {isMobile ? (
        <>
          <Menu dataToSort={feedbackPosts} setData={setFilteredFeedback} />
          <div className="home-page">
            <RenderAllFeedback feedbackPosts={filteredFeedback} />
          </div>
        </>
      ) : (
        <div className="home-page">
          <div className="__left-content">
            <Logo />
            <WidgetUser />
            <WidgetSelectCategory
              dataToSort={feedbackPosts}
              setData={setFilteredFeedback}
            />
            <WidgetRoadMap feedback={feedbackPosts} />
          </div>
          <div className="__right-content">
            <ToolBar dataToSort={feedbackPosts} setData={setFilteredFeedback} />
            <RenderAllFeedback feedbackPosts={filteredFeedback} />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
