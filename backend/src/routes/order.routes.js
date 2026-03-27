import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  updateOrderToPaid,
  getDashboardStats,
} from '../controllers/order.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminOnly } from '../middleware/role.middleware.js';

const router = express.Router();

// Customer routes
router.route('/').post(protect, createOrder).get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

// Admin routes
router.route('/admin/orders').get(protect, adminOnly, getAllOrders);
router.route('/admin/orders/:id').put(protect, adminOnly, updateOrderStatus);
router.route('/admin/stats').get(protect, adminOnly, getDashboardStats);

export default router;
