import { useState, useEffect } from 'react';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { orderService } from '../services/api';
import PaymentReceipt from '../components/PaymentReceipt';

const statusIcons = {
  Pending: Clock,
  Processing: Package,
  Shipped: Truck,
  Delivered: CheckCircle,
  Cancelled: XCircle,
};

const statusColors = {
  Pending: 'text-yellow-600 bg-yellow-100',
  Processing: 'text-blue-600 bg-blue-100',
  Shipped: 'text-purple-600 bg-purple-100',
  Delivered: 'text-green-600 bg-green-100',
  Cancelled: 'text-red-600 bg-red-100',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getUserOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Package size={80} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-4">Start shopping to create your first order!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const StatusIcon = statusIcons[order.orderStatus];
          return (
            <div key={order._id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusColors[order.orderStatus]}`}>
                  <StatusIcon size={16} />
                  <span className="font-medium">{order.orderStatus}</span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <p className="font-bold">₹{(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-primary-600">₹{order.totalPrice}</p>
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <p className="text-sm text-gray-600 mb-1">Shipping Address</p>
                <p className="text-sm">
                  {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.state} - {order.shippingAddress.zipCode}
                </p>
              </div>

              {/* Payment Receipt */}
              <PaymentReceipt order={order} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
