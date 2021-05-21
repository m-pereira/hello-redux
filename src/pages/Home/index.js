import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ProductList } from './styles';
import { MdAddShoppingCart } from 'react-icons/md';
import PropTypes from 'prop-types';
import homePage from '../../services/homePage';
import * as CartActions from '../../store/modules/cart/actions';
import { bindActionCreators } from 'redux';

const Home = ({ addToCartRequest, cartAmount }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const onSuccess = (data) => setProducts(data);
  const onError = (e) => alert(`Deu ruim: ${e}`);
  const onEnd = () => setLoading(false);

  useEffect(async () => {
    homePage({ onSuccess, onError, onEnd });
  }, []);

  if (loading) {
    return <h1 style={{ color: '#fff' }}>Carregando...</h1>;
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type='button' onClick={() => addToCartRequest(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color='#fff' />{' '}
              {cartAmount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

Home.propTypes = {
  addToCartRequest: PropTypes.func,
  cartAmount: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cartAmount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

// parecido com o mapStateToProps, porem para as actions do redux
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
