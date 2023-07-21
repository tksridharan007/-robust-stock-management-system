import React, { useState } from 'react';
import { db } from '../firebase'; 
import { getDoc, setDoc, doc } from 'firebase/firestore';

const ProductForm = () => {
  const [productName, setProductName] = useState('');



  const handleAddProduct = async () => {
    try {
      if (!productName) {
        alert('Product name cannot be empty.');
        return;
      }

      const productId = 'C6bazasbQVaNKs6x6Tg3'; 

      
      const productRef = doc(db, 'products', productId);

      
      const docSnapshot = await getDoc(productRef);
      const existingData = docSnapshot.data() || {};

     
      const updatedproductName = existingData.productName
        ? existingData.productName + ', ' + productName
        : productName;

      
      await setDoc(productRef, {
        productName: updatedproductName,
      });

      alert('Product added successfully!');
      setProductName(''); 
    } catch (error) {
      alert('Error adding product: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={productName} 
        onChange={(e) => setProductName(e.target.value)}
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default ProductForm;
