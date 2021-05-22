import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, ProductTable, Total } from './styles';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { formatPrice } from '../../utils/formatPrice';
import {
  updateAmountRequest,
  removeFromCart,
} from '../../store/modules/cart/actions';

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) =>
    state.cart.map((product) => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const total = useSelector((state) =>
    formatPrice(
      state.cart.reduce((total, product) => {
        return total + product.price * product.amount;
      }, 0)
    )
  );

  const increment = (product) =>
    dispatch(updateAmountRequest(product.id, product.amount + 1));
  const decrement = (product) =>
    dispatch(updateAmountRequest(product.id, product.amount - 1));

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type='button'>
                    <MdRemoveCircleOutline
                      size={20}
                      color='#7159c1'
                      onClick={() => decrement(product)}
                      style={product.amount == 1 ? { opacity: 0.5 } : null}
                    />
                  </button>
                  <input type='number' readOnly value={product.amount} />
                  <button type='button'>
                    <MdAddCircleOutline
                      size={20}
                      color='#7159c1'
                      onClick={() => increment(product)}
                    />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type='button'
                  onClick={() => dispatch(removeFromCart(product.id))}
                >
                  <MdDelete size={20} color='#7159c1' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type='button'>Finalizar pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

export default Cart;
