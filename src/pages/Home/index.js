import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductList } from './styles';
import { MdAddShoppingCart } from 'react-icons/md';
import homePage from '../../services/homePage';
import * as CartActions from '../../store/modules/cart/actions';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const amount = useSelector((state) =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;

      return amount;
    }, {})
  );

  const dispatch = useDispatch();

  const handleAddProduct = (id) => {
    dispatch(CartActions.addToCartRequest(id));
  };

  const onSuccess = (data) => setProducts(data);
  const onError = (e) => alert(`Deu ruim: ${e}`);
  const onEnd = () => setLoading(false);

  useEffect(() => {
    const loadHomePage = async () => homePage({ onSuccess, onError, onEnd });

    loadHomePage();
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

          <button type='button' onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color='#fff' />{' '}
              {amount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

// parecido com o mapStateToProps, porem para as actions do redux
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(CartActions, dispatch);

export default Home;
