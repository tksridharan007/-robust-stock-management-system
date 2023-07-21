import React, { useState } from 'react';
import { db } from '../firebase'; 
import { getDoc, doc, updateDoc } from 'firebase/firestore';

const ProductForm = () => {
  const [productName, setProductName] = useState('');

  const handleDeleteProduct = async () => {
    try {
      if (!productName) {
        alert('Product name cannot be empty.');
        return;
      }

      const productId = 'C6bazasbQVaNKs6x6Tg3'; 

      
      const productRef = doc(db, 'products', productId);

      
      const docSnapshot = await getDoc(productRef);
      const existingData = docSnapshot.data() || {};

      
      const currentProductNames = existingData.productName || '';

      
      const productNamesArray = currentProductNames.split(', ');

     
      if (!productNamesArray.includes(productName)) {
        alert('Product does not exist in the database.');
        return;
      }

      
      const updatedProductNames = productNamesArray.filter((name) => name !== productName);

      
      const updatedProductName = updatedProductNames.join(', ');

      
      await updateDoc(productRef, {
        productName: updatedProductName,
      });

      alert('Product deleted successfully!');
      setProductName(''); 
    } catch (error) {
      alert('Error deleting product: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={productName} 
        onChange={(e) => setProductName(e.target.value)}
      />
      <button onClick={handleDeleteProduct}>Delete Product</button>
    </div>
  );
};

export default ProductForm;
