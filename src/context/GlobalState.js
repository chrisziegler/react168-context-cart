import React, { Component } from 'react';
import ShopContext from './shop-context';

export default class GlobalState extends Component {
  // state is where we manage the data we pass down to context
  state = {
    products: [
      { id: 'p1', title: 'The Oracle Year - A Novel', price: 12.08, cover: 'TheOracle.jpg' },
      { id: 'p2', title: 'The Book of M', price: 11.41, cover: 'BookOfM.jpg' },
      { id: 'p3', title: 'The Gone Year', price: 11.95, cover: 'TheGoneYear.jpg' },
      { id: 'p4', title: 'Semiosis', price: 12.78, cover: 'Semiosis.jpg' }
    ],
    cart: [],
    cartSum: 0
  };

  addProductToCart = product => {
    const updatedCart = [...this.state.cart];
    const updatedItemIndex = updatedCart.findIndex(item => item.id === product.id);

    if (updatedItemIndex < 0) {
      updatedCart.push({ ...product, quantity: 1 });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }
    setTimeout(() => {
      this.setState(prevState => ({ ...prevState, cart: updatedCart }));
    }, 300);
  };

  removeProductFromCart = productId => {
    const updatedCart = [...this.state.cart];
    const updatedItemIndex = updatedCart.findIndex(item => item.id === productId);

    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }
    setTimeout(() => {
      this.setState(prevState => ({ ...prevState, cart: updatedCart }));
    }, 300);
  };
  render() {
    return (
      <ShopContext.Provider
        value={{
          products: this.state.products,
          cart: this.state.cart,
          addProductToCart: this.addProductToCart,
          removeProductFromCart: this.removeProductFromCart
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}
