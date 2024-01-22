export function areCartsEqual(serverCart, localCart) {
    if (serverCart.length !== localCart.length) {
      return false;
    }
  
    for (let i = 0; i < serverCart.length; i++) {
      const serverItem = serverCart[i];
      const localItem = localCart.find(item => item._id === serverItem._id);
  
      if (!localItem || localItem.quantity !== serverItem.quantity) {
        return false;
      }
    }
  
    return true;
  }
  