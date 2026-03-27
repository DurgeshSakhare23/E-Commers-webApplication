import { Download, CheckCircle, Eye } from 'lucide-react';

const PaymentReceipt = ({ order }) => {
  const handleDownload = () => {
    const receiptContent = generateReceiptHTML(order);
    const blob = new Blob([receiptContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ProdMart-Receipt-${order._id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleView = () => {
    const receiptContent = generateReceiptHTML(order);
    const viewWindow = window.open('', '_blank');
    viewWindow.document.write(receiptContent);
    viewWindow.document.close();
    viewWindow.focus();
  };

  const generateReceiptHTML = (order) => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Payment Receipt - ${order._id}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #2563eb;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #2563eb;
      margin: 0;
      font-size: 32px;
    }
    .header p {
      color: #666;
      margin: 5px 0;
    }
    .receipt-info {
      background: #f3f4f6;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .receipt-info table {
      width: 100%;
    }
    .receipt-info td {
      padding: 8px 0;
    }
    .receipt-info td:first-child {
      font-weight: bold;
      width: 150px;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
    }
    .status-paid {
      background: #dcfce7;
      color: #166534;
    }
    .status-unpaid {
      background: #fee2e2;
      color: #991b1b;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .items-table th {
      background: #2563eb;
      color: white;
      padding: 12px;
      text-align: left;
    }
    .items-table td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }
    .items-table tr:last-child td {
      border-bottom: none;
    }
    .totals {
      margin-top: 20px;
      text-align: right;
    }
    .totals table {
      margin-left: auto;
      min-width: 300px;
    }
    .totals td {
      padding: 8px 12px;
    }
    .totals .total-row {
      font-size: 18px;
      font-weight: bold;
      border-top: 2px solid #2563eb;
      color: #2563eb;
    }
    .shipping-address {
      background: #f9fafb;
      padding: 15px;
      border-left: 4px solid #2563eb;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      color: #666;
      font-size: 14px;
    }
    .paid-stamp {
      text-align: center;
      margin: 30px 0;
    }
    .paid-stamp .stamp {
      display: inline-block;
      border: 4px solid #16a34a;
      color: #16a34a;
      padding: 10px 30px;
      font-size: 24px;
      font-weight: bold;
      transform: rotate(-5deg);
      border-radius: 8px;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>ProdMart</h1>
    <p>Payment Receipt</p>
  </div>

  <div class="receipt-info">
    <table>
      <tr>
        <td>Receipt No:</td>
        <td><strong>${order._id}</strong></td>
      </tr>
      <tr>
        <td>Order Date:</td>
        <td>${new Date(order.createdAt).toLocaleDateString('en-IN', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</td>
      </tr>
      <tr>
        <td>Payment Method:</td>
        <td>${order.paymentMethod}</td>
      </tr>
      <tr>
        <td>Payment Status:</td>
        <td>
          <span class="status-badge ${order.isPaid ? 'status-paid' : 'status-unpaid'}">
            ${order.isPaid ? '✓ PAID' : 'UNPAID'}
          </span>
        </td>
      </tr>
      ${order.isPaid ? `
      <tr>
        <td>Payment Date:</td>
        <td>${new Date(order.paidAt).toLocaleDateString('en-IN', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</td>
      </tr>
      ` : ''}
      <tr>
        <td>Order Status:</td>
        <td><strong>${order.orderStatus}</strong></td>
      </tr>
    </table>
  </div>

  ${order.isPaid ? `
  <div class="paid-stamp">
    <div class="stamp">PAID</div>
  </div>
  ` : ''}

  <h3>Order Items</h3>
  <table class="items-table">
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${order.orderItems.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>₹${item.price.toFixed(2)}</td>
          <td>₹${(item.quantity * item.price).toFixed(2)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="totals">
    <table>
      <tr>
        <td>Subtotal:</td>
        <td>₹${order.itemsPrice}</td>
      </tr>
      <tr>
        <td>Shipping:</td>
        <td>₹${order.shippingPrice}</td>
      </tr>
      <tr>
        <td>Tax (18%):</td>
        <td>₹${order.taxPrice}</td>
      </tr>
      <tr class="total-row">
        <td>Total Amount:</td>
        <td>₹${order.totalPrice}</td>
      </tr>
    </table>
  </div>

  <div class="shipping-address">
    <h3 style="margin-top: 0;">Shipping Address</h3>
    <p style="margin: 5px 0;">${order.shippingAddress.street}</p>
    <p style="margin: 5px 0;">${order.shippingAddress.city}, ${order.shippingAddress.state}</p>
    <p style="margin: 5px 0;">${order.shippingAddress.zipCode}, ${order.shippingAddress.country}</p>
  </div>

  <div class="footer">
    <p><strong>Thank you for shopping with ProdMart!</strong></p>
    <p>For any queries, contact us at support@prodmart.com</p>
    <p style="margin-top: 10px; font-size: 12px;">
      This is a computer-generated receipt and does not require a signature.
    </p>
  </div>
</body>
</html>
    `;
  };

  if (!order.isPaid) {
    return null; // Only show receipt for paid orders
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-600" size={24} />
          <div>
            <h3 className="font-bold text-green-800">Payment Receipt Available</h3>
            <p className="text-sm text-green-700">Your payment has been confirmed</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleView}
            className="btn-secondary flex items-center gap-2"
          >
            <Eye size={18} />
            View Receipt
          </button>
          <button
            onClick={handleDownload}
            className="btn-primary flex items-center gap-2"
          >
            <Download size={18} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
