import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:4001/api/products', {
      credentials: 'include',
    })
      .then(async res => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || 'Failed to fetch products');
        }
        return res.json();
      })
      .then(data => setProducts(data.products))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: 'center', margin: 40 }}>Loading products...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', margin: 40 }}>{error}</div>;

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, width: 220 }}>
            <h3>{product.name}</h3>
            <div>₹{product.price}</div>
            <Link to={`/products/${product._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products; 