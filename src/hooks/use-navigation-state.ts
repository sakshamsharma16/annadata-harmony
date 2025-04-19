
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavigationState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? "" : name);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown("");
  };

  return {
    isMenuOpen,
    setIsMenuOpen,
    isScrolled,
    activeDropdown,
    toggleDropdown,
    closeMenu
  };
};
