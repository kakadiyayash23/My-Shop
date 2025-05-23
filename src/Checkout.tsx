import React, { useState, useEffect } from 'react';

import { LoadingIcon } from './Icons';
import { getStoreItems } from './getDataService';
import './Checkout.css';

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
  // Format price and total to 2 decimal places
  const formattedPrice = price.toFixed(2);
  const formattedTotal = total.toFixed(2);

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>₹{formattedPrice}</td>
      <td>{orderedQuantity}</td>
      <td>₹{formattedTotal}</td>
      <td>
        <button 
          className="actionButton"
          onClick={() => onIncrement(id)}
          disabled={orderedQuantity >= availableCount}
        >
          +
        </button>
        <button 
          className="actionButton"
          onClick={() => onDecrement(id)}
          disabled={orderedQuantity <= 0}
        >
          -
        </button>
      </td>
    </tr>
  );
};

const Checkout: React.FC = () => {
  const [products, setProducts] = useState<ProductWithOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [gst, setGst] = useState<number>(0);

  useEffect(() => {
    // Load products when component mounts
    getStoreItems()
      .then((items: ProductItem[]) => {
        // Add orderedQuantity and total to each product
        const productsWithOrder = items.map(item => ({
          ...item,
          orderedQuantity: 0,
          total: 0
        }));
        setProducts(productsWithOrder);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading products:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Calculate order total and GST
    const subtotal = products.reduce((sum, product) => sum + product.total, 0);
    
    // Apply 18% GST if subtotal is over ₹1000
    const gstAmount = subtotal > 1000 ? subtotal * 0.18 : 0;
    
    setOrderTotal(subtotal + gstAmount);
    setGst(gstAmount);
  }, [products]);

  const handleIncrement = (id: number) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === id && product.orderedQuantity < product.availableCount) {
          const newQuantity = product.orderedQuantity + 1;
          return {
            ...product,
            orderedQuantity: newQuantity,
            total: newQuantity * product.price
          };
        }
        return product;
      })
    );
  };

  const handleDecrement = (id: number) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === id && product.orderedQuantity > 0) {
          const newQuantity = product.orderedQuantity - 1;
          return {
            ...product,
            orderedQuantity: newQuantity,
            total: newQuantity * product.price
          };
        }
        return product;
      })
    );
  };

  return (
    <div>
      <header className="header">
        <h1>My Bajar Shop</h1>
      </header>
      <main>
        <LoadingIcon isLoading={isLoading} />
        
        {!isLoading && (
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
              <tbody>
                {products.map(product => (
                  <Product
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    availableCount={product.availableCount}
                    price={product.price}
                    orderedQuantity={product.orderedQuantity}
                    total={product.total}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                  />
                ))}
              </tbody>
            </table>
            
            <div className="order-details">
              <h2>Order Details</h2>
              {gst > 0 && (
                <div className="detail-row">
                  <span className="gst-applied">GST (18%):</span>
                  <span>₹ {gst.toFixed(2)}</span>
                </div>
              )}
              <div className="total-row">
                <span>Total:</span>
                <span>₹ {orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Checkout;