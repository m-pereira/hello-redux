const addToCart = (product) => {
  return {
    type: '@cart/ADD',
    product,
  };
};

const removeFromCart = (id) => {
  return {
    type: '@cart/REMOVE',
    id,
  };
};

const updateAmount = (id, amount) => {
  return {
    type: '@cart/UPDATE_AMOUNT',
    id,
    amount,
  };
};

export { addToCart, removeFromCart, updateAmount };
