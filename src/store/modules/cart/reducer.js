// with immer we can create an draft of reducer, apply changes on it
// and then pass this draft as new reducer
import produce from 'immer';

// createStore needs a reducer, that is a function
const cart = (state = [], action) => {
  switch (action.type) {
    case '@cart/ADD':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id == action.product.id);

        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({ ...action.product, amount: 1 });
        }
      });
    case '@cart/REMOVE':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id == action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT': {
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
