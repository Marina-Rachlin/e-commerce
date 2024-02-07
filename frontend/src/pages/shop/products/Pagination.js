const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];


  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="shop-pagination">
      <ul className="pagination-list">
        <li>
          <a
            onClick={(e) => {
              if (currentPage === 1) {
                e.preventDefault(); // Prevent default action if already at the first page
                return; // Exit early
              }
              onPageChange(currentPage - 1);
            }}
            className="shop-pagi-btn"
            style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            <i className="bi bi-chevron-left" />
          </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className="shop-pagination-item">
            <a
              onClick={() => onPageChange(number)}
              className={currentPage === number ? 'active' : ''}
              style={{ cursor: 'pointer' }}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <a
            onClick={(e) => {
              if (currentPage === totalPages) {
                e.preventDefault(); // Prevent default action if already at the last page
                return; // Exit early
              }
              onPageChange(currentPage + 1);
            }}
            className="shop-pagi-btn"
            style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
          >
            <i className="bi bi-chevron-right" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
