
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        setIsAuthenticated(true);
        
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.session.user.id)
          .single();
        
        if (userData) {
          setUserRole(userData.role);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    toast({
      title: "Authentication Required",
      description: "Please log in to access this page",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole as string)) {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this page",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
