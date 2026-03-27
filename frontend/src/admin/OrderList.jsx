import { useState, useEffect } from 'react';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { orderService } from '../services/api';

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const statusIcons = {
  Pending: Clock,
  Processing: Package,
  Shipped: Truck,
  Delivered: CheckCircle,
  Cancelled: XCircle,
};

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-600',
  Processing: 'bg-blue-100 text-blue-600',
  Shipped: 'bg-purple-100 text-purple-600',
  Delivered: 'bg-green-100 text-green-600',
  Cancelled: 'bg-red-100 text-red-600',
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, { orderStatus: newStatus });
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const handleMarkAsPaid = async (orderId) => {
    if (window.confirm('Mark this order as paid?')) {
      try {
        const paymentData = {
          id: `ADMIN_PAYMENT_${Date.now()}`,
          status: 'completed',
          update_time: new Date().toISOString(),
          email_address: 'admin@prodmart.com',
        };
        
        await orderService.updateOrderToPaid(orderId, paymentData);
        
        // Update local state
        setOrders(
          orders.map((order) =>
            order._id === orderId 
              ? { ...order, isPaid: true, paidAt: new Date().toISOString() } 
              : order
          )
        );
        
        alert('Order marked as paid successfully!');
      } catch (error) {
        console.error('Error marking order as paid:', error);
        alert('Failed to mark order as paid');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders Management</h1>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Items</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Payment</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const StatusIcon = statusIcons[order.orderStatus];
                const isExpanded = expandedOrder === order._id;

                return (
                  <>
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">
                        {order._id.slice(-8)}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{order.user?.name}</p>
                          <p className="text-sm text-gray-600">{order.user?.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{order.orderItems.length}</td>
                      <td className="py-3 px-4 font-bold">₹{order.totalPrice}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm">{order.paymentMethod}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              order.isPaid
                                ? 'bg-green-100 text-green-600'
                                : 'bg-red-100 text-red-600'
                            }`}
                          >
                            {order.isPaid ? 'Paid' : 'Unpaid'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${statusColors[order.orderStatus]}`}>
                          <StatusIcon size={14} />
                          <span className="text-sm font-medium">{order.orderStatus}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() =>
                            setExpandedOrder(isExpanded ? null : order._id)
                          }
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          {isExpanded ? 'Hide' : 'Details'}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan="8" className="bg-gray-50 p-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Order Items */}
                            <div>
                              <h3 className="font-bold mb-3">Order Items</h3>
                              <div className="space-y-2">
                                {order.orderItems.map((item) => (
                                  <div
                                    key={item._id}
                                    className="flex items-center gap-3 bg-white p-2 rounded"
                                  >
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                      <p className="font-medium text-sm">{item.name}</p>
                                      <p className="text-xs text-gray-600">
                                        Qty: {item.quantity} × ₹{item.price}
                                      </p>
                                    </div>
                                    <p className="font-bold text-sm">
                                      ₹{(item.quantity * item.price).toFixed(2)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Shipping & Status Update */}
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-bold mb-2">Shipping Address</h3>
                                <div className="bg-white p-3 rounded text-sm">
                                  <p>{order.shippingAddress.street}</p>
                                  <p>
                                    {order.shippingAddress.city}, {order.shippingAddress.state}
                                  </p>
                                  <p>
                                    {order.shippingAddress.zipCode},{' '}
                                    {order.shippingAddress.country}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-bold mb-2">Update Status</h3>
                                <select
                                  value={order.orderStatus}
                                  onChange={(e) =>
                                    handleStatusChange(order._id, e.target.value)
                                  }
                                  className="input-field"
                                >
                                  {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                      {status}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Mark as Paid Button */}
                              {!order.isPaid && (
                                <div>
                                  <h3 className="font-bold mb-2">Payment Action</h3>
                                  <button
                                    onClick={() => handleMarkAsPaid(order._id)}
                                    className="btn-primary w-full"
                                  >
                                    💰 Mark as Paid
                                  </button>
                                  <p className="text-xs text-gray-600 mt-2">
                                    Click to confirm payment received
                                  </p>
                                </div>
                              )}

                              {order.isPaid && (
                                <div className="bg-green-50 p-3 rounded">
                                  <h3 className="font-bold mb-1 text-green-700">✓ Payment Received</h3>
                                  <p className="text-xs text-green-600">
                                    Paid on: {new Date(order.paidAt).toLocaleDateString()}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
