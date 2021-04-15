import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Cart } from './styles';
import logo from '../../assets/images/logo.svg';
import { MdShoppingBasket } from 'react-icons/md';

function Header() {
  return (
    <Container>
      <Link to='/'>
        <img src={logo} alt='Rocketshoes' />
      </Link>

      <Cart to='/cart'>
        <div>
          <strong>Meu Carrinho</strong>
          <span>3 itens</span>
          <MdShoppingBasket size={36} color='#fff' />
        </div>
      </Cart>
    </Container>
  );
}

export default Header;
