import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productId = 'C6bazasbQVaNKs6x6Tg3'; 
        const productDoc = await getDoc(doc(db, 'products', productId));
        
        if (productDoc.exists()) {
          const productName = productDoc.data().productName;
          setProducts([{ id: productId, name: productName }]);
          setLoading(false);
          setError('');
        } else {
          setError('Product not found');
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError('Error fetching product: ' + error.message);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
