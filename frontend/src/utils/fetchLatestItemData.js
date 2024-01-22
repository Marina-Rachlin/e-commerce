export const fetchLatestItemData = async (productId) => {
    try {
      console.log('productId =>', productId);
      const response = await fetch(`/product/${productId}/latest`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching latest product data:', error);
      throw error;
    }
  };
  