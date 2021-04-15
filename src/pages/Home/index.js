import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ProductList } from './styles';
import { MdAddShoppingCart } from 'react-icons/md';
import PropTypes from 'prop-types';
import homePage from '../../services/homePage';

const Home = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const onSuccess = (data) => {
    setProducts(data);
  };
  const onError = (e) => alert(`Deu ruim: ${e}`);
  const onEnd = () => setLoading(false);

  const handleAddProduct = (product) => {
    const { dispatch } = props;

    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };

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

          <button type='button' onClick={() => handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart size={16} color='#fff' /> 3
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

Home.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Home);
