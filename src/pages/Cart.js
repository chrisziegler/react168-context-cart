import React, { Component } from 'react';
import { connect } from 'react-redux';

import MainNavigation from '../components/MainNavigation';
import { removeProductFromCart } from '../store/actions';
import './Cart.css';

class CartPage extends Component {
  render() {
    return (
      <>
        <MainNavigation cartItemNumber={this.props.cartItemCount} />
        <main className="cart">
          {this.props.cartItems.length <= 0 && <p>No Item in the Cart!</p>}
          <ul>
            {this.props.cartItems.map(cartItem => (
              <li key={cartItem.id}>
                <div>
                  <strong>{cartItem.title}</strong> - ${cartItem.price} ({cartItem.quantity})
                </div>
                <div>
                  <button onClick={this.props.removeProductFromCart.bind(this, cartItem.id)}>
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

const mapStateToProps = state => {
  return {
    cartItems: state.cart,
    cartItemCount: state.cart.reduce((count, curItem) => {
      return count + curItem.quantity;
    }, 0)
  };
};

// Instead I  use the "object shorthand" form of mapDispatchToProps below
// const mapDispatchToProps = dispatch => {
//   return {
//     removeProductFromCart: id => dispatch(removeProductFromCart(id))
//   };
// };

export default connect(
  mapStateToProps,
  // mapDispatchToProps
  { removeProductFromCart }
)(CartPage);
