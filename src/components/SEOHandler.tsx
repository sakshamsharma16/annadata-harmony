
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "./SEOHead";
import { getCacheItem, setCacheItem } from "../utils/cacheUtils";

interface PageSEOData {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
}

const SEOHandler: React.FC = () => {
  const location = useLocation();
  const [seoData, setSeoData] = useState<PageSEOData>({
    title: "Home",
    description: "An integrated digital platform connecting farmers, vendors, and consumers"
  });
  
  useEffect(() => {
    const path = location.pathname;
    let pageData: PageSEOData = {
      title: "Home",
      description: "An integrated digital platform connecting farmers, vendors, and consumers"
    };
    
    // Define SEO data for each route
    if (path === "/") {
      pageData = {
        title: "Home",
        description: "Annadata - An integrated digital platform connecting farmers, vendors, and consumers across India",
        keywords: "agriculture, farmers market, farm to table, organic produce, India agriculture",
        ogType: "website"
      };
    } else if (path.includes("/dashboard/farmers")) {
      pageData = {
        title: "Farmer Dashboard",
        description: "Manage your farm business, products and analytics with real-time market data",
        keywords: "farmer dashboard, crop management, agricultural analytics, farm business",
        ogType: "website"
      };
    } else if (path.includes("/dashboard/vendors")) {
      pageData = {
        title: "Vendor Dashboard",
        description: "Access your marketplace analytics and manage orders from farmers and to consumers",
        keywords: "vendor dashboard, marketplace, agricultural products, supply chain",
        ogType: "website"
      };
    } else if (path.includes("/dashboard/consumers")) {
      pageData = {
        title: "Consumer Dashboard",
        description: "Track your orders and find fresh local produce from verified farmers and vendors",
        keywords: "consumer dashboard, organic food, local produce, farm fresh",
        ogType: "website"
      };
    } else if (path.includes("/dashboard/analytics")) {
      pageData = {
        title: "Market Analytics",
        description: "Comprehensive agricultural market data and price trends for informed decisions",
        keywords: "market analytics, price trends, agricultural market, data analysis",
        ogType: "website"
      };
    } else if (path.includes("/about")) {
      pageData = {
        title: "About Us",
        description: "Learn about our mission to transform agriculture through technology and fair trade",
        keywords: "agricultural platform, mission, sustainable farming, technology in agriculture",
        ogType: "website"
      };
    } else if (path.includes("/contact")) {
      pageData = {
        title: "Contact",
        description: "Get in touch with our team for support, partnerships, or general inquiries",
        keywords: "contact, support, agricultural services, help",
        ogType: "website"
      };
    } else if (path.includes("/services")) {
      pageData = {
        title: "Services",
        description: "Explore our range of services for the agricultural ecosystem, from farm to table",
        keywords: "agricultural services, farm support, supply chain, logistics",
        ogType: "website"
      };
    }
    
    setSeoData(pageData);
    setCacheItem(`last-visited-${path}`, new Date().toISOString());
  }, [location]);
  
  return (
    <SEOHead 
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      ogUrl={`https://annadata.com${location.pathname}`}
      ogType={seoData.ogType}
    />
  );
};

export default SEOHandler;
