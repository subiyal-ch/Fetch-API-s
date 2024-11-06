// ProductButton.js
import React, { useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import "./ProductButton.css";

const ProductButton = () => {
  const [productData, setProductData] = useState([]);

  const handleButtonClick = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const productsWithQuantity = response.data.map((product) => ({
        ...product,
        quantity: 1, // Initialize quantity for each product
      }));
      setProductData(productsWithQuantity);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddProduct = (newProduct) => {
    setProductData((prevData) => [...prevData, { ...newProduct, quantity: 1 }]); // Add new product with quantity
  };

  const handleIncrement = (index) => {
    setProductData((prevData) =>
      prevData.map((product, i) =>
        i === index ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const handleDecrement = (index) => {
    setProductData((prevData) =>
      prevData.map((product, i) =>
        i === index && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Fetch Products</button>
      <ProductForm onAddProduct={handleAddProduct} />
      <div className="product-grid">
        {productData.map((product, index) => (
          <div key={index} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
              <div className="quantity-container">
                <button
                  onClick={() => handleDecrement(index)}
                  className="quantity-button"
                >
                  -
                </button>
                <span className="quantity">{product.quantity}</span>
                <button
                  onClick={() => handleIncrement(index)}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
              <p className="total-price">
                Total: ${(product.price * product.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductButton;
