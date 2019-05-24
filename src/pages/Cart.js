import React, { Component } from 'react';

import ShopContext from '../context/shop-context';
import MainNavigation from '../components/MainNavigation';
import './Cart.css';

class CartPage extends Component {
  // contextType allows lifecycle methods and gives you this.context
  static contextType = ShopContext;
  render() {
    return (
      <>
        <MainNavigation
          cartItemNumber={this.context.cart.reduce((count, curItem) => {
            return count + curItem.quantity;
          }, 0)}
        />
        <main className="cart">
          {this.context.cart.length <= 0 && <p>No Item in the Cart!</p>}
          <ul>
            {this.context.cart.map(cartItem => (
              <li key={cartItem.id}>
                <div>
                  <img src={`images/${cartItem.cover}`} height="65" alt="book cover" />
                </div>
                <div>
                  <strong>{cartItem.title}</strong> - ${cartItem.price} ({cartItem.quantity})
                </div>
                <div>
                  <button onClick={this.context.removeProductFromCart.bind(this, cartItem.id)}>
                    Remove from Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </>
    );
  }
}

export default CartPage;
