import React from 'react';
import './Checkout.css';
import { getStoreItems } from './getDataService';
import { LoadingIcon } from './Icons';

interface ProductItem {
  id: number;
  name: string;
  price: number;
  availableCount: number;
}

interface ProductWithOrder extends ProductItem {
  orderedQuantity: number;
  total: number;
}

interface ProductProps {
  id: number;
  name: string;
  availableCount: number;
  price: number;
  orderedQuantity: number;
  total: number;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  availableCount,
  price,
  orderedQuantity,
  total,
  onIncrement,
  onDecrement
}) => {
  
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>₹{price}</td>
      <td>{orderedQuantity}</td>
      <td>₹{total}</td>
      <td>
        <button className="actionButton" onClick={() => onIncrement(id)}>
          +
        </button>
        <button className="actionButton" onClick={() => onDecrement(id)}>
          -
        </button>
      </td>
    </tr>
  );
};

const Checkout: React.FC = () => {
return (
    <div>
      <LoadingIcon isLoading={true} />
      <header className="header">
        <h1>My Shop</h1>
      </header>
      <main>
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Available</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <div className="order-details">
              <h2>Order Details</h2>
                <div className="detail-row">
                  <span className="tax-applied">TAX (18%):</span>
                  <span>₹ 00</span>
                </div>
              <div className="total-row">
                <span>Total:</span>
                <span>₹ 00</span>
              </div>
            </div>
          </>
      </main>
    </div>
  );
};

export default Checkout;