import { useContext } from "react";
import _ from "lodash";
import BackButton from "../common/BackButton";
import EditFeedbackButton from "../EditFeedbackButton";
import SuggestionBox from "../ProductRequest";
import CommentsSection from "../CommentsSection";
import { ProductRequestContext } from "../../custom-hooks/Contexts";
import { useHistory } from "react-router";

const FeedbackDetail = () => {
  const history = useHistory();
  const { selectedProductRequest } = useContext(ProductRequestContext);
  const commentsCount = _.size(selectedProductRequest["comments"]);

  if (!selectedProductRequest) {
    history.push("/not-found");
    return null;
  }

  return (
    <div className="feedback-detail-page">
      <div className="__top-group flex flex-ai-c flex-jc-sb">
        <BackButton />
        <EditFeedbackButton />
      </div>
      <SuggestionBox
        title={selectedProductRequest["title"]}
        description={selectedProductRequest["description"]}
        category={selectedProductRequest["category"]}
        upvotes={selectedProductRequest["upvotes"]}
        commentsCount={commentsCount}
      />
      <CommentsSection
        commentsCount={commentsCount}
        comments={selectedProductRequest["comments"]}
      />
    </div>
  );
};

export default FeedbackDetail;
