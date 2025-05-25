import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

interface CartItem {
    name: string;
    quantity: number;
    price: number;
}

const Cart = () => {
    const [items, setItems] = useState<CartItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem('items');
        if (stored) {
            setItems(JSON.parse(stored));
        }
    }, []);

    const placeOrder = () => {
        if (items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const requestBody = {
            items: items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount: getTotal(),
            userId: JSON.parse(localStorage.getItem('user') || '{}')._id,
        };

        console.log('Placing order with data:', requestBody);

        fetch('http://localhost:4001/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(requestBody),
        })
            .then(async res => {
                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.message || 'Failed to place order');
                }
                return res.json();
            })
            .then(data => {
                alert('Order placed successfully!');
                clearCart();
                navigate('/orders');
            })
            .catch(err => {
                alert(`Error placing order: ${err.message}`);
            });
    }

    const getTotal = () => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const clearCart = () => {
        localStorage.removeItem('items');
        setItems([]);
    };

    if (items.length === 0) {
        return <div style={{textAlign: 'center', margin: 40}}>Your cart is empty.</div>;
    }

    return (
        <div style={{maxWidth: 700, margin: '40px auto'}}>
            <h2>Your Cart</h2>
            <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: 24}}>
                <thead>
                <tr style={{background: '#f5f5f5'}}>
                    <th style={{padding: 8, border: '1px solid #eee'}}>Product</th>
                    <th style={{padding: 8, border: '1px solid #eee'}}>Quantity</th>
                    <th style={{padding: 8, border: '1px solid #eee'}}>Price</th>
                    <th style={{padding: 8, border: '1px solid #eee'}}>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, idx) => (
                    <tr key={idx}>
                        <td style={{padding: 8, border: '1px solid #eee'}}>{item.name}</td>
                        <td style={{padding: 8, border: '1px solid #eee'}}>{item.quantity}</td>
                        <td style={{padding: 8, border: '1px solid #eee'}}>₹{item.price}</td>
                        <td style={{
                            padding: 8,
                            border: '1px solid #eee'
                        }}>₹{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{textAlign: 'right', fontWeight: 'bold', fontSize: 18, marginBottom: 24}}>
                Total: ₹{getTotal().toFixed(2)}
            </div>
            <button onClick={placeOrder} style={{
                padding: '10px 24px',
                background: '#2ecc71',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                marginRight: 12
            }}>
                Place Order
            </button>
            <button onClick={clearCart} style={{
                padding: '10px 24px',
                background: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
            }}>
                Clear Cart
            </button>
        </div>
    );
};

export default Cart; 