import React from 'react';

import { LoadingIcon } from './Icons';
import { getStoreItems } from './getDataService';
import './Checkout.css';

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Once the <Checkout /> component is mounted, load the products using the getStoreItems function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over ₹1000, apply a 18% GST to the order. Display the GST text only if a GST has been applied.
//  - The total should reflect any GST that has been applied
//  - All Ruppes amounts should be displayed to 2 decimal places

const Product = ({
  id,
  name,
  availableCount,
  price,
  orderedQuantity,
  total,
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
        <button className="actionButton">+</button>
        <button className="actionButton">-</button>
      </td>
    </tr>
  );
};

const Checkout = () => {
  return (
    <div>
      <header className="header">
        <h1>My Bajar Shop</h1>
      </header>
      <main>
        <LoadingIcon />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Available</th>
              <th>Price (₹) </th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{/* Products should be rendered here */}</tbody>
        </table>
        <h2>Order Details</h2>
        <p>GST: ₹ </p>
        <p>Total: ₹ </p>
      </main>
    </div>
  );
};

export default Checkout;
