import {useEffect, useState} from 'react';

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    items: OrderItem[];
    totalAmount: number;
    createdAt: string;
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError('');
            try {
                // You may need to adjust the endpoint or add auth headers as needed
                const res = await fetch('http://localhost:4001/api/orders/getOrders', {
                    credentials: 'include',
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                    },
                });
                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.message || 'Failed to fetch orders');
                }
                const data = await res.json();
                setOrders(data.orders || []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const deleteOrder = async (orderId: string) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;

        try {
            const res = await fetch(`http://localhost:4001/api/orders/${orderId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                },
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Failed to delete order');
            }
            setOrders(orders.filter(order => order._id !== orderId));
            alert('Order deleted successfully!');
        } catch (err: any) {
            alert(`Error deleting order: ${err.message}`);
        }
    }

    if (loading) return <div style={{textAlign: 'center', margin: 40}}>Loading orders...</div>;
    if (error) return <div style={{color: 'red', textAlign: 'center', margin: 40}}>{error}</div>;
    if (!orders.length) return <div style={{textAlign: 'center', margin: 40}}>You have no orders yet.</div>;

    return (
        <div style={{maxWidth: 900, margin: '40px auto'}}>
            <h2>Your Orders</h2>
            {orders.map(order => (
                <div key={order._id} style={{border: '1px solid #eee', borderRadius: 8, padding: 20, marginBottom: 24}}>
                    <div style={{marginBottom: 8, fontWeight: 'bold'}}>Order ID: {order._id}</div>
                    <div style={{marginBottom: 8}}>Date: {new Date(order.createdAt).toLocaleString()}</div>
                    <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: 12}}>
                        <thead>
                        <tr style={{background: '#f5f5f5'}}>
                            <th style={{padding: 8, border: '1px solid #eee'}}>Product</th>
                            <th style={{padding: 8, border: '1px solid #eee'}}>Quantity</th>
                            <th style={{padding: 8, border: '1px solid #eee'}}>Price</th>
                            <th style={{padding: 8, border: '1px solid #eee'}}>Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.items.map((item, idx) => (
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
                    <button
                        onClick={() => deleteOrder(order._id)}
                        style={{
                            background: 'red',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: 4,
                            cursor: 'pointer'
                        }}
                    >
                        Delete Order
                    </button>
                    <div style={{textAlign: 'right', fontWeight: 'bold', fontSize: 16}}>
                        Total: ₹{order.totalAmount.toFixed(2)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Orders; 