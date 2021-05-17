import api from '../../../services/api';
// call: responsavel por chamar metodos assincronos, retorna uma Promise
// put: dispara uma action do redux
// all: cadastrar listeners
// takeLatest: controla a quantidade de disparos, pois vamos fazer uma chama na api
//  e se o usuario clicar varias vezes antes da api retornar, esse carinha discarta
//  os outros disparos
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { addToCartSuccess } from './actions';
import { CART_ADD_REQUEST } from './types';

// parecido com async await, porem usando generators que tem mais funcionalidades
function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(response.data));
}

export default all([takeLatest(CART_ADD_REQUEST, addToCart)]);
