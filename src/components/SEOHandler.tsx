
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "./SEOHead";
import { getCacheItem, setCacheItem } from "../utils/cacheUtils";

const SEOHandler: React.FC = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Home");
  const [pageDescription, setPageDescription] = useState("");
  
  useEffect(() => {
    const path = location.pathname;
    
    if (path === "/") {
      setPageTitle("Home");
      setPageDescription("An integrated digital platform connecting farmers, vendors, and consumers");
    } else if (path.includes("/dashboard/farmer")) {
      setPageTitle("Farmer Dashboard");
      setPageDescription("Manage your farm business, products and analytics");
    } else if (path.includes("/dashboard/vendor")) {
      setPageTitle("Vendor Dashboard");
      setPageDescription("Access your marketplace analytics and manage orders");
    } else if (path.includes("/dashboard/consumer")) {
      setPageTitle("Consumer Dashboard");
      setPageDescription("Track your orders and find fresh local produce");
    } else if (path.includes("/dashboard/admin")) {
      setPageTitle("Admin Dashboard");
      setPageDescription("Manage the platform, users and analytics");
    } else if (path.includes("/about")) {
      setPageTitle("About Us");
      setPageDescription("Learn about our mission to transform agriculture");
    } else if (path.includes("/contact")) {
      setPageTitle("Contact");
      setPageDescription("Get in touch with our team");
    } else if (path.includes("/services")) {
      setPageTitle("Services");
      setPageDescription("Explore our range of services for the agricultural ecosystem");
    }
    
    setCacheItem(`last-visited-${path}`, new Date().toISOString());
  }, [location]);
  
  return (
    <SEOHead 
      title={pageTitle}
      description={pageDescription}
      ogUrl={`https://annadata.com${location.pathname}`}
    />
  );
};

export default SEOHandler;
