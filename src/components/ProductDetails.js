import React, { useState } from 'react';
import { db } from '../firebase'; 
import { updateDoc, doc, getDoc } from 'firebase/firestore';

const ProductDetails = () => {
  const productId = 'C6bazasbQVaNKs6x6Tg3'; 
  const [product, setProduct] = useState({});
  const [updatedPrice, setUpdatedPrice] = useState('');

  const fetchProduct = async () => {
    try {
      const productRef = doc(db, 'products', productId);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
        setUpdatedPrice(productSnapshot.data().price || ''); 
      } else {
        console.log('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleUpdatePrice = async () => {
    try {
     
      if (!product.id) {
        console.error('Product not found');
        return;
      }

      
      if (!updatedPrice.trim()) {
        console.error('Product price cannot be empty');
        return;
      }

     
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, { price: updatedPrice });

      alert('Product price updated successfully!');
    } catch (error) {
      console.error('Error updating product price:', error);
      alert('Error updating product price: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Product Details</h2>
      <p>Document ID: {product.id}</p>
      <p>Product Price: {product.price}</p>
      <input
        type="text"
        placeholder="Updated Product Price"
        value={updatedPrice}
        onChange={(e) => setUpdatedPrice(e.target.value)}
      />
      <button onClick={fetchProduct}>Fetch Product</button>
      <button onClick={handleUpdatePrice}>Update Price</button>
    </div>
  );
};

export default ProductDetails;
