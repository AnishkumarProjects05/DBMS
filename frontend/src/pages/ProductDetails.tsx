import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

interface Product {
    _id: string;
    name: string;
    price: number;
    description?: string;
    image?: string;
}

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:4001/api/products/${id}`, {
            credentials: 'include',
        })
            .then(async res => {
                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.message || 'Failed to fetch product');
                }
                return res.json();
            })
            .then(data => setProduct(data.product))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div style={{textAlign: 'center', margin: 40}}>Loading product...</div>;
    if (error) return <div style={{color: 'red', textAlign: 'center', margin: 40}}>{error}</div>;
    if (!product) return <div style={{textAlign: 'center', margin: 40}}>Product not found.</div>;

    const addToCart = () => {
        // This function will handle adding the product to the cart
        // Implementation will be done later
        console.log(`Adding product ${product.name} to cart`);
        // save orders to local storage
        const items = JSON.parse(localStorage.getItem('items') || '[]');
        const item = {
            name: product.name,
            quantity: parseInt((document.getElementById('quantity') as HTMLInputElement).value, 10),
            price: product.price,
        };
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        alert(`${product.name} has been added to your cart!`);
    }

    return (
        <div style={{maxWidth: 600, margin: '40px auto'}}>
            <h2>{product.name}</h2>
            <div>₹{product.price}</div>
            {product.description && <div style={{margin: '16px 0'}}>{product.description}</div>}
            {product.image && (
                <img
                    src={product.image}
                    alt={product.name}
                    style={{width: '100%', height: 'auto', borderRadius: 8}}
                />
            )}
            {/* quantity */}
            <div style={{marginTop: 16}}>
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    defaultValue="1"
                    style={{marginLeft: 8, width: 60}}
                />
            </div>
            {/* Add to Cart button will be implemented later */}
            <button style={{padding: '10px 24px', marginTop: 16}}
                    onClick={addToCart}
            >Add to Cart</button>
        </div>
    );
};

export default ProductDetails; 