import * as CartTypes from './types';

const addToCartRequest = (id) => {
  return {
    type: CartTypes.CART_ADD_REQUEST,
    id,
  };
};

const addToCartSuccess = (product) => {
  return {
    type: CartTypes.CART_ADD_SUCCESS,
    product,
  };
};

const removeFromCart = (id) => {
  return {
    type: CartTypes.CART_REMOVE,
    id,
  };
};

const updateAmount = (id, amount) => {
  return {
    type: CartTypes.CART_UPDATE_AMOUNT,
    id,
    amount,
  };
};

export { addToCartRequest, addToCartSuccess, removeFromCart, updateAmount };
