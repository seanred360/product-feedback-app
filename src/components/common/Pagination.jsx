import PropTypes from "prop-types";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  // The logic in Google's pagination is as follows:
  // there are 10 page links shown at any time (e.g. 1 2 3 4 5 6 7 8 9 10) unless there are less than 10 total pages
  // the active link (current page) is in the 6th position, except for when the active link is below 6 or less than 4 from the last position
  // this is modified to be a max of 6 page links not 10
  // https://jasonwatmore.com/post/2017/03/14/react-pagination-example-with-logic-like-google

  const calculatePagesToRender = () => {
    const totalPages = Math.ceil(itemsCount / pageSize);
    // if we only have 1 page do not create page number buttons
    if (totalPages === 1) return null;

    let startPage, endPage;
    if (totalPages <= 6) {
      // less than 6 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 6 total pages so calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    const pageNumbers = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );
    return { pageNumbers, totalPages };
  };

  const pageData = calculatePagesToRender();

  // these are just buttons with numbers that tell the parent element which page to go to
  // they know nothing about what the pages have on them
  if (!pageData || pageData.totalPages < 2) return null;
  return (
    <div className="pagination-btns-container">
      <button
        className="btn prev"
        aria-label="Previous page"
        onClick={() => onPageChange("prev", pageData.totalPages)}
      >
        <GoChevronLeft />
      </button>
      {pageData.pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={
            pageNumber === currentPage
              ? "btn active"
              : "btn"
          }
          aria-label={"Page " + pageNumber}
          onClick={() => onPageChange(pageNumber, pageData.totalPages)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="btn next"
        aria-label="Next page"
        onClick={() => onPageChange("next", pageData.totalPages)}
      >
        <GoChevronRight />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
