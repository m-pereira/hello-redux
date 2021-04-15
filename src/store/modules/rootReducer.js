import { combineReducers } from 'redux';
import cart from './cart/reducer';
// as needed, you can import every reducer you have,
// and combine them, like this

export default combineReducers({
  cart,
});
