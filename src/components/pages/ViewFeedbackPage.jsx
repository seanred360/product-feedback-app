import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import BackButton from "../common/BackButton";
import EditFeedbackButton from "../EditFeedbackButton";
import RenderFeedback from "../RenderFeedback";
import CommentsSection from "../RenderCommentsSection";
import useAxios from "../../custom-hooks/useAxios";
import Spinner from "../common/Spinner";

const ViewFeedbackPage = () => {
  const location = useLocation();
  const [selectedFeedback, setSelectedFeedback] = useState();
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${process.env.REACT_APP_MONGO_URL}/${location.pathname}`,
  });
  useEffect(() => {
    if (response !== null) {
      setSelectedFeedback(response);
    }
  }, [response]);

  if (loading) return <Spinner />;
  if (error) return <strong>{error.message}</strong>;
  return (
    <div className="view-feedback-page">
      <div className="__top-group flex flex-ai-c flex-jc-sb">
        <BackButton />
        <EditFeedbackButton selectedFeedback={selectedFeedback} />
      </div>
      <RenderFeedback
        title={selectedFeedback.title}
        feedback={selectedFeedback}
        description={selectedFeedback.description}
        category={selectedFeedback.category}
        upvotes={selectedFeedback.upvotes}
        commentsCount={selectedFeedback.comments.length}
      />
      <CommentsSection
        commentsCount={selectedFeedback.comments.length}
        targetFeedback={selectedFeedback}
      />
    </div>
  );
};

export default ViewFeedbackPage;
