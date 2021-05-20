// with immer we can create an draft of reducer, apply changes on it
// and then pass this draft as new reducer
import * as CartTypes from './types';
import produce from 'immer';

// createStore needs a reducer, that is a function
const cart = (state = [], action) => {
  switch (action.type) {
    case CartTypes.CART_ADD_SUCCESS:
      return produce(state, (draft) => {
        const { product } = action;

        draft.push(product);
      });
    case CartTypes.CART_REMOVE:
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id == action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case CartTypes.CART_UPDATE_AMOUNT: {
      if (action.amount < 1) {
        return state;
      }

      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id == action.id);

        if (productIndex >= 0) draft[productIndex].amount = action.amount;
      });
    }
    default:
      return state;
  }
};

export default cart;
