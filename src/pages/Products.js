import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import ShopContext from '../context/shop-context';
import MainNavigation from '../components/MainNavigation';
import './Products.css';

class ProductsPage extends Component {
  render() {
    return (
      <ShopContext.Consumer>
        {context => (
          <React.Fragment>
            <MainNavigation
              cartItemNumber={context.cart.reduce((count, curItem) => {
                return count + curItem.quantity;
              }, 0)}
            />
            <main className="products">
              <ul>
                {context.products.map(product => (
                  <li key={product.id}>
                    <div>
                      <img src={`images/${product.cover}`} height="100" alt={product.title} />
                    </div>
                    <div>
                      <strong>{product.title}</strong> - ${product.price}
                    </div>
                    <div>
                      <button onClick={context.addProductToCart.bind(this, product)}>
                        <FontAwesomeIcon
                          icon={faCartPlus}
                          style={{ color: 'white', marginRight: 10 }}
                          size="md"
                          title="Shopping Cart"
                        />
                        <span style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Add to Cart</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </main>
          </React.Fragment>
        )}
      </ShopContext.Consumer>
    );
  }
}

export default ProductsPage;
