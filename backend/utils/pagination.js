export const paginateResults = (results, page = 1, pageSize = 10) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return results.slice(startIndex, endIndex);
  };
  
  export const calculateTotalPages = (totalItems, pageSize = 10) => {
    return Math.ceil(totalItems / pageSize);
  };
  