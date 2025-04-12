
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, ShoppingCart, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const NavigationMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [cartItems, setCartItems] = useState(2);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
        // Fetch user role from users table
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.session.user.id)
          .single();
        
        if (userData) {
          setUserRole(userData.role);
        }
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    };
    
    checkAuth();
  }, []);

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setUserRole(null);
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Public navigation links (exploration phase)
  const publicNavLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  // Get appropriate dashboard link based on user role
  const getDashboardLink = () => {
    switch(userRole) {
      case 'farmer':
        return '/dashboard/farmer';
      case 'vendor':
        return '/dashboard/vendor';
      case 'consumer':
        return '/dashboard/consumer';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/login';
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo-placeholder.svg" 
              alt="Annadata Logo" 
              className="h-10 w-10 mr-2"
            />
            <span className="font-bold text-xl text-[#138808]">ANNADATA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Only show public links when not logged in */}
            {!isLoggedIn && publicNavLinks.map((link, index) => (
              <Link 
                key={index}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.path
                    ? 'text-[#138808] font-semibold'
                    : 'text-gray-700 hover:text-[#138808]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Show role-specific links when logged in */}
            {isLoggedIn && userRole === 'farmer' && (
              <>
                <Link 
                  to="/dashboard/farmer"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/dashboard/farmer' ? 'text-[#138808] font-semibold' : 'text-gray-700 hover:text-[#138808]'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/farmer/products"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/farmer/products' ? 'text-[#138808] font-semibold' : 'text-gray-700 hover:text-[#138808]'
                  }`}
                >
                  My Products
                </Link>
                <Link 
                  to="/agriculture/crop-health"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/agriculture/crop-health' ? 'text-[#138808] font-semibold' : 'text-gray-700 hover:text-[#138808]'
                  }`}
                >
                  Crop Health
                </Link>
              </>
            )}
            
            {isLoggedIn && userRole === 'vendor' && (
              <>
                <Link 
                  to="/dashboard/vendor"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/dashboard/vendor' ? 'text-[#138808] font-semibold' : 'text-gray-700 hover:text-[#138808]'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/vendor/marketplace"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/vendor/marketplace' ? 'text-[#138808] font-semibold' : 'text-gray-700 hover:text-[#138808]'
                  }`}
                >
                  Marketplace
                </Link>
              </>
            )}
            
            {isLoggedIn && userRole === 'consumer' && (
              <>
                <Link 
                  to="/dashboard/consumer"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/dashboard/consumer' ? 'text-[#138808] font-semibold' : 'text-gray-700 hover:text-[#138808]'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/consumer/nearby-vendors"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/consumer/nearby-vendors' ? 'text-[#138808] font-semibold' : 'text-gray-700 hover:text-[#138808]'
                  }`}
                >
                  Nearby Vendors
                </Link>
              </>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {notifications > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                          {notifications}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <div className="flex flex-col">
                        <span className="font-medium">New order received</span>
                        <span className="text-xs text-gray-500">2 minutes ago</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex flex-col">
                        <span className="font-medium">Price alert: Tomatoes</span>
                        <span className="text-xs text-gray-500">1 hour ago</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex flex-col">
                        <span className="font-medium">Payment received</span>
                        <span className="text-xs text-gray-500">Yesterday</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Cart - only for consumers */}
                {userRole === 'consumer' && (
                  <Link to="/checkout" className="relative">
                    <Button variant="ghost" size="icon">
                      <ShoppingCart className="h-5 w-5" />
                      {cartItems > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#138808]">
                          {cartItems}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative flex items-center gap-2 h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem className="font-medium text-sm capitalize">
                      Role: {userRole || 'User'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={getDashboardLink()}>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">{t('auth.login')}</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" className="bg-[#138808] hover:bg-[#0c6606]">
                    {t('auth.register')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#138808] focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-1">
            {/* Only show public links when not logged in */}
            {!isLoggedIn && publicNavLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-[#138808] font-semibold'
                    : 'text-gray-700 hover:text-[#138808]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Show role-specific links when logged in */}
            {isLoggedIn && (
              <>
                <Link
                  to={getDashboardLink()}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === getDashboardLink()
                      ? 'text-[#138808] font-semibold'
                      : 'text-gray-700 hover:text-[#138808]'
                  }`}
                >
                  Dashboard
                </Link>
                
                {userRole === 'farmer' && (
                  <>
                    <Link
                      to="/farmer/products"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        location.pathname === '/farmer/products'
                          ? 'text-[#138808] font-semibold'
                          : 'text-gray-700 hover:text-[#138808]'
                      }`}
                    >
                      My Products
                    </Link>
                    <Link
                      to="/agriculture/crop-health"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        location.pathname === '/agriculture/crop-health'
                          ? 'text-[#138808] font-semibold'
                          : 'text-gray-700 hover:text-[#138808]'
                      }`}
                    >
                      Crop Health
                    </Link>
                  </>
                )}
                
                {userRole === 'vendor' && (
                  <Link
                    to="/vendor/marketplace"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === '/vendor/marketplace'
                        ? 'text-[#138808] font-semibold'
                        : 'text-gray-700 hover:text-[#138808]'
                    }`}
                  >
                    Marketplace
                  </Link>
                )}
                
                {userRole === 'consumer' && (
                  <Link
                    to="/consumer/nearby-vendors"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === '/consumer/nearby-vendors'
                        ? 'text-[#138808] font-semibold'
                        : 'text-gray-700 hover:text-[#138808]'
                    }`}
                  >
                    Nearby Vendors
                  </Link>
                )}
              </>
            )}
            
            <div className="pt-4 border-t border-gray-200">
              {isLoggedIn ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-gray-500">
                    Role: <span className="capitalize">{userRole || 'User'}</span>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#138808]"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700"
                  >
                    <LogOut className="inline mr-2 h-4 w-4" />
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#138808]"
                  >
                    {t('auth.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-[#138808]"
                  >
                    {t('auth.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationMenu;
