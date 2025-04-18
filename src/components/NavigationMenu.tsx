
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, User, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { m, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';

const NavigationMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Check if current route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Team", path: "/team" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl text-[#138808]">ANNADATA</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "text-[#138808] bg-[#138808]/10"
                    : "text-gray-700 hover:text-[#138808] hover:bg-[#138808]/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSelector />
            
            <Button 
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => window.location.href = "/login"}
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Button>
            
            <Button 
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
              onClick={() => window.location.href = "/admin-login"}
            >
              <ShieldAlert className="h-4 w-4" />
              <span>Admin</span>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <LanguageSelector />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 p-2 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <m.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden bg-white shadow-lg rounded-b-lg mt-1 absolute left-0 right-0 z-10 px-4 py-5 border-t"
            >
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <m.div key={item.name} variants={itemVariants}>
                    <div
                      onClick={() => window.location.href = item.path}
                      className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium cursor-pointer",
                        isActive(item.path)
                          ? "text-[#138808] bg-[#138808]/10"
                          : "text-gray-700 hover:text-[#138808] hover:bg-[#138808]/5"
                      )}
                    >
                      {item.name}
                    </div>
                  </m.div>
                ))}
                
                <m.div variants={itemVariants} className="pt-2">
                  <div className="block">
                    <Button 
                      className="w-full flex items-center gap-1"
                      variant="outline"
                      onClick={() => window.location.href = "/login"}
                    >
                      <User className="h-4 w-4" />
                      <span>Login</span>
                    </Button>
                  </div>
                </m.div>
                
                <m.div variants={itemVariants}>
                  <div className="block">
                    <Button 
                      className="w-full flex items-center gap-1"
                      variant="ghost"
                      onClick={() => window.location.href = "/admin-login"}
                    >
                      <ShieldAlert className="h-4 w-4" />
                      <span>Admin Portal</span>
                    </Button>
                  </div>
                </m.div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default NavigationMenu;
