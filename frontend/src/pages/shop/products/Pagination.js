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
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="shop-pagi-btn"
              style={{cursor: 'pointer'}}
            >
              <i className="bi bi-chevron-left" />
            </a>
          </li>
          {pageNumbers.map(number => (
            <li key={number} className="shop-pagination pagination-list">
              <a
                onClick={() => onPageChange(number)}
                className={currentPage === number ? 'active' : ''}
                style={{cursor: 'pointer'}}
              >
                {number}
              </a>
            </li>
          ))}
          <li>
            <a
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="shop-pagi-btn"
              style={{cursor: 'pointer'}}
            >
              <i className="bi bi-chevron-right" />
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  export default Pagination
  