import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Cart } from './styles';
import logo from '../../assets/images/logo.svg';
import { MdShoppingBasket } from 'react-icons/md';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Header({ cartSize }) {
  return (
    <Container>
      <Link to='/'>
        <img src={logo} alt='Rocketshoes' />
      </Link>

      <Cart to='/cart'>
        <div>
          <strong>Meu Carrinho</strong>
          <span>{cartSize} itens</span>
          <MdShoppingBasket size={36} color='#fff' />
        </div>
      </Cart>
    </Container>
  );
}

Header.propTypes = {
  cartSize: PropTypes.number,
};

const mapStateToProps = (state) => ({
  cartSize: state.cart.length,
});

export default connect(mapStateToProps)(Header);
