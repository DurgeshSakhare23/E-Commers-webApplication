import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            ProdMart
          </Link>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                {!isAdmin && (
                  <>
                    <Link to="/cart" className="relative hover:text-primary-600 transition-colors">
                      <ShoppingCart size={24} />
                      {getCartCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {getCartCount()}
                        </span>
                      )}
                    </Link>
                    <Link to="/orders" className="hover:text-primary-600 transition-colors">
                      My Orders
                    </Link>
                  </>
                )}
                
                {isAdmin && (
                  <Link to="/admin" className="flex items-center gap-2 hover:text-primary-600 transition-colors">
                    <LayoutDashboard size={20} />
                    Dashboard
                  </Link>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <User size={20} />
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
