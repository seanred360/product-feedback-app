import { useEffect, useState } from "react";
import _ from "lodash";
import { paginate } from "./common/paginate";
import RenderFeedback from "./RenderFeedback";
import RenderFeedbackEmpty from "./RenderFeedbackEmpty";
import Pagination from "./common/Pagination";

const RenderAllFeedback = ({ feedbackPosts }) => {
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const pageOfFeedback = paginate(feedbackPosts, currentPage, pageSize);

  const handlePageChange = (pageNumber, totalPages) => {
    if (pageNumber !== "prev" && pageNumber !== "next")
      setCurrentPage(pageNumber);
    else if (pageNumber === "prev" && currentPage > 1)
      setCurrentPage(currentPage - 1);
    else if (pageNumber === "next" && currentPage < totalPages)
      setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [feedbackPosts]);

  return (
    <div className="all-feedback">
      {pageOfFeedback && !_.isEmpty(pageOfFeedback) ? (
        pageOfFeedback.map((feedback) => (
          <RenderFeedback
            feedback={feedback}
            key={feedback._id}
            title={feedback.title}
            description={feedback.description}
            category={feedback.category}
            upvotes={feedback.upvotes}
            commentsCount={_.size(feedback.comments)}
            clickable={true}
          />
        ))
      ) : (
        <RenderFeedbackEmpty />
      )}
      <Pagination
        itemsCount={feedbackPosts.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RenderAllFeedback;
