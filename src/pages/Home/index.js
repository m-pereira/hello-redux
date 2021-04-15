import React, { useState, useEffect } from 'react';
import { ProductList } from './styles';
import { MdAddShoppingCart } from 'react-icons/md';
import homePage from '../../services/homePage';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const onSuccess = (data) => {
    setProducts(data);
  };
  const onError = (e) => console.log(`Deu ruim: ${e}`);
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

          <button type='button'>
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

export default Home;
