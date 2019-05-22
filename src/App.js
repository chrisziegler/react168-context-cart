import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ShopContext from './context/shop-context';
import ProductsPage from './pages/Products';
import CartPage from './pages/Cart';
import './App.css';

class App extends Component {
  // Obviously sticking with a Class-based component for our import React, { PureComponent } from 'react'
  // repeat of our mock data here in State
  // it's only in shop-context.js to provide auto-completition
  state = {
    products: [
      { id: 'p1', title: 'Gaming Mouse', price: 29.99 },
      { id: 'p2', title: 'Harry Potter 3', price: 9.99 },
      { id: 'p3', title: 'Used plastic bottle', price: 0.99 },
      { id: 'p4', title: 'Half-dried plant', price: 2.99 }
    ],
    cart: [],
    cartSum: 0
  };

  addProductToCart = product => {
    console.log('Adding product', product);
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
      this.setState({ cart: updatedCart });
    }, 700);
  };

  removeProductFromCart = productId => {
    console.log('Removing product with id: ' + productId);
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
      this.setState({ cart: updatedCart });
    }, 700);
  };

  render() {
    return (
      // wrap your components to provide context
      // now they have all these app state values and methods in props
      <ShopContext.Provider
        value={{
          products: this.state.products,
          cart: this.state.cart,
          addProductToCart: this.addProductToCart,
          removeProductFromCart: this.removeProductFromCart
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route path="/" component={ProductsPage} exact />
            <Route path="/cart" component={CartPage} exact />
          </Switch>
        </BrowserRouter>
      </ShopContext.Provider>
    );
  }
}

export default App;
