import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product._id}`} className="card hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            Out of Stock
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
      
      <div className="flex items-center gap-1 mb-3">
        <Star size={16} className="fill-yellow-400 text-yellow-400" />
        <span className="text-sm text-gray-600">
          {product.rating.toFixed(1)} ({product.numReviews})
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary-600">₹{product.price}</span>
        {isAuthenticated && !isAdmin && product.stock > 0 && (
          <button
            onClick={handleAddToCart}
            className="btn-primary flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            Add
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
