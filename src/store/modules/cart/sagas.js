import api from '../../../services/api';
// call: responsavel por chamar metodos assincronos, retorna uma Promise;
// put: dispara uma action do redux;
// all: cadastrar listeners;
// takeLatest: controla a quantidade de disparos, pois vamos fazer uma chama na api
//  e se o usuario clicar varias vezes antes da api retornar, esse carinha discarta
//  os outros disparos;
// select: responsavel por buscar informações dentro do estado redux;
// sempre que usar um effect de redux-saga, é preciso chamar o yield;
import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { addToCartSuccess, updateAmountSuccess } from './actions';
import { CART_ADD_REQUEST, CART_UPDATE_AMOUNT_REQUEST } from './types';
import { formatPrice } from '../../../utils/formatPrice';
import { toast } from 'react-toastify';

// parecido com async await, porem usando generators que tem mais funcionalidades
function* addToCart({ id }) {
  const productExists = yield select((state) =>
    state.cart.find((product) => product.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;
  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade fora de estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: amount,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest(CART_ADD_REQUEST, addToCart),
  takeLatest(CART_UPDATE_AMOUNT_REQUEST, updateAmount),
]);
