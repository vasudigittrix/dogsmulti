import { Pagination } from "@mui/material"; // Assuming you're using Material-UI for Pagination

function CustomPagination({ count, currentPage, handlePageChange }) {
  // Generate an array of page numbers based on the count
  const pages = Array.from({ length: count }, (_, index) => index + 1);

  return (
    <nav aria-label="..." className="text-center">
      <ul className="pagination">
        {/* Previous button */}
        <li className="page-item Previous">
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {/* Page numbers */}
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        {/* Next button */}
        <li className="page-item Next">
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === count}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default CustomPagination;
