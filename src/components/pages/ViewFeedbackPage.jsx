import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase";
import useAxios from "../../custom-hooks/useAxios";
import BackButton from "../common/BackButton";
import EditFeedbackButton from "../EditFeedbackButton";
import RenderFeedback from "../RenderFeedback";
import CommentsSection from "../RenderCommentsSection";
import PageSpinner from "../common/PageSpinner";

const ViewFeedbackPage = () => {
  const location = useLocation();
  const [selectedFeedback, setSelectedFeedback] = useState();
  const { response, loading, error, controller } = useAxios({
    method: "get",
    url: `${process.env.REACT_APP_MONGO_URL}/${location.pathname}`,
  });

  useEffect(() => {
    if (response !== null) {
      setSelectedFeedback(response);
    }
    return () => {
      //if the ajax call doesn't finish before we unmount, cancel it
      controller.abort();
    };
  }, [response, controller]);

  if (loading) return <PageSpinner />;
  if (error) return <strong>{error.message}</strong>;
  if (!selectedFeedback) return <Redirect to="/" />;
  return (
    <div className="view-feedback-page">
      <div className="__top-group flex flex-ai-c flex-jc-sb">
        <BackButton />
        {auth.currentUser.uid === selectedFeedback.author && (
          <EditFeedbackButton selectedFeedback={selectedFeedback} />
        )}
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
