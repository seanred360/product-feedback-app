import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import _ from "lodash";
import BackButton from "../common/BackButton";
import EditFeedbackButton from "../EditFeedbackButton";
import ProductRequest from "../ProductRequest";
import CommentsSection from "../CommentsSection";
import useAxios from "../../custom-hooks/useAxios";
import Spinner from "../common/Spinner";

const ViewFeedbackPage = () => {
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
  if (error) return <strong>{error.message}</strong>;
  const commentsCount = _.size(selectedProduct["comments"]);

  if (loading) return <Spinner />;
  return (
    <div className="feedback-detail-page">
      <div className="__top-group flex flex-ai-c flex-jc-sb">
        <BackButton />
        <EditFeedbackButton selectedProduct={selectedProduct} />
      </div>
      <ProductRequest
        title={selectedProduct["title"]}
        product={selectedProduct}
        description={selectedProduct["description"]}
        category={selectedProduct["category"]}
        upvotes={selectedProduct["upvotes"]}
        commentsCount={commentsCount}
      />
      <CommentsSection
        commentsCount={commentsCount}
        targetFeedback={selectedProduct}
      />
    </div>
  );
};

export default ViewFeedbackPage;
