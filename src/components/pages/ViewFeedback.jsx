import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import _ from "lodash";
import BackButton from "../common/BackButton";
import EditFeedbackButton from "../EditFeedbackButton";
import SuggestionBox from "../ProductRequest";
import CommentsSection from "../CommentsSection";
import useAxios from "../../custom-hooks/useAxios";
import Spinner from "../common/Spinner";

const ViewFeedback = () => {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState();
  const { response, loading, error } = useAxios({
    method: "get",
    url: `https://product-feedback-rest-api.herokuapp.com/productrequests${location.pathname}`,
  });
  useEffect(() => {
    if (response !== null) {
      setSelectedProduct(response);
    }
  }, [response]);

  if (loading) return <Spinner />;
  if (error) return <h1>ERROR</h1>;
  const commentsCount = _.size(selectedProduct["comments"]);

  if (loading) return <Spinner />;
  return (
    <div className="feedback-detail-page">
      <div className="__top-group flex flex-ai-c flex-jc-sb">
        <BackButton />
        <EditFeedbackButton selectedProduct={selectedProduct} />
      </div>
      <SuggestionBox
        title={selectedProduct["title"]}
        description={selectedProduct["description"]}
        category={selectedProduct["category"]}
        upvotes={selectedProduct["upvotes"]}
        commentsCount={commentsCount}
      />
      <CommentsSection
        commentsCount={commentsCount}
        comments={selectedProduct["comments"]}
      />
    </div>
  );
};

export default ViewFeedback;
