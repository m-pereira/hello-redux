import * as CartTypes from './types';

export const addToCartRequest = (id) => {
  return {
    type: CartTypes.CART_ADD_REQUEST,
    id,
  };
};

export const addToCartSuccess = (product) => {
  return {
    type: CartTypes.CART_ADD_SUCCESS,
    product,
  };
};

export const removeFromCart = (id) => {
  return {
    type: CartTypes.CART_REMOVE,
    id,
  };
};

export const updateAmountRequest = (id, amount) => {
  return {
    type: CartTypes.CART_UPDATE_AMOUNT_REQUEST,
    id,
    amount,
  };
};

export const updateAmountSuccess = (id, amount) => {
  return {
    type: CartTypes.CART_UPDATE_AMOUNT_SUCCESS,
    id,
    amount,
  };
};
