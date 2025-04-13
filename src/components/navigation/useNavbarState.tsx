
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export type UserRole = "farmer" | "vendor" | "consumer" | null;

interface NavbarState {
  scrolled: boolean;
  isAuthenticated: boolean;
  userRole: UserRole;
  dashboardLink: string;
}

const useNavbarState = (): NavbarState => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  // Handle scroll events for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock authentication based on URL for demo purposes
  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      setIsAuthenticated(true);
      if (location.pathname.includes("farmer")) {
        setUserRole("farmer");
      } else if (location.pathname.includes("vendor")) {
        setUserRole("vendor");
      } else if (location.pathname.includes("consumer")) {
        setUserRole("consumer");
      }
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, [location]);

  // Get appropriate dashboard link based on user role
  const dashboardLink = userRole ? `/dashboard/${userRole}` : "/";

  return {
    scrolled,
    isAuthenticated,
    userRole,
    dashboardLink
  };
};

export default useNavbarState;
