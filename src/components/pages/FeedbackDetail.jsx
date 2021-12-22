import { useContext } from "react";
import _ from "lodash";
import BackButton from "../common/BackButton";
import EditFeedbackButton from "../EditFeedbackButton";
import SuggestionBox from "../ProductRequest";
import CommentsSection from "../CommentsSection";
import { DataContext } from "../../custom-hooks/Contexts";
import { useHistory } from "react-router";

const FeedbackDetail = () => {
  const history = useHistory();
  const { selectedProduct } = useContext(DataContext);
  const commentsCount = _.size(selectedProduct["comments"]);

  if (!selectedProduct) {
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

export default FeedbackDetail;
