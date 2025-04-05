
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavigationMenu as NavMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Download, UserPlus, Leaf, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { getCacheItem, setCacheItem } from "@/utils/cacheUtils";

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { t } = useLanguage();
  const location = useLocation();

  // Handle scroll events for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Set active section based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveSection("home");
    } else if (path.includes("/dashboard/farmer") || path.includes("/farmer")) {
      setActiveSection("farmers");
    } else if (path.includes("/dashboard/vendor") || path.includes("/vendor")) {
      setActiveSection("vendors");
    } else if (path.includes("/dashboard/consumer") || path.includes("/consumer")) {
      setActiveSection("consumers");
    } else if (path.includes("/dashboard/analytics")) {
      setActiveSection("analytics");
    } else if (path.includes("/about") || path.includes("/team") || path.includes("/contact") || path.includes("/faq")) {
      setActiveSection("about");
    } else if (path.includes("/services")) {
      setActiveSection("services");
    }
  }, [location]);

  // Cache the last visited page for a smoother return experience
  useEffect(() => {
    setCacheItem('annadata-last-page', location.pathname, 1440); // Cache for 24 hours
  }, [location.pathname]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-white/90 backdrop-blur-md border-b border-gray-200 py-4"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex-shrink-0 flex items-center font-bold text-2xl text-[#138808]"
            aria-label="Annadata Home"
          >
            <Leaf className="h-6 w-6 mr-2" aria-hidden="true" />
            Annadata
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavMenu className="relative z-[100]">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        activeSection === "home" && "bg-accent text-accent-foreground"
                      )}
                    >
                      {t('nav.home')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      activeSection === "farmers" && "bg-accent text-accent-foreground"
                    )}
                  >
                    {t('nav.farmers')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[280px] gap-2 p-4 md:w-[400px] md:grid-cols-2">
                      <li className="md:col-span-2">
                        <div className="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                          Farmer Resources
                        </div>
                      </li>
                      <li>
                        <Link 
                          to="/dashboard/farmer"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Farmer Dashboard</div>
                          <div className="text-xs text-muted-foreground">Manage your farming business</div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/farmer/products"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Products</div>
                          <div className="text-xs text-muted-foreground">List and manage your products</div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/agriculture/crop-health"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Crop Health</div>
                          <div className="text-xs text-muted-foreground">Monitor and improve crop health</div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/market-prices"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Market Prices</div>
                          <div className="text-xs text-muted-foreground">View current market trends</div>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      activeSection === "vendors" && "bg-accent text-accent-foreground"
                    )}
                  >
                    {t('nav.vendors')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[280px] gap-2 p-4 md:w-[400px] md:grid-cols-2">
                      <li className="md:col-span-2">
                        <div className="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                          Vendor Resources
                        </div>
                      </li>
                      <li>
                        <Link 
                          to="/dashboard/vendor"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Vendor Dashboard</div>
                          <div className="text-xs text-muted-foreground">Manage your vendor account</div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/vendor/marketplace"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Marketplace</div>
                          <div className="text-xs text-muted-foreground">Browse available products</div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/vendor/analytics"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Sales Analytics</div>
                          <div className="text-xs text-muted-foreground">Track your business performance</div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/vendor/resources"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Resources</div>
                          <div className="text-xs text-muted-foreground">Helpful guides and tools</div>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      activeSection === "consumers" && "bg-accent text-accent-foreground"
                    )}
                  >
                    {t('nav.consumers')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[280px] gap-2 p-4 md:w-[400px] md:grid-cols-2">
                      <li className="md:col-span-2">
                        <div className="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                          Consumer Resources
                        </div>
                      </li>
                      <li>
                        <Link 
                          to="/dashboard/consumer"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Consumer Dashboard</div>
                          <div className="text-xs text-muted-foreground">Manage your consumer account</div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/consumer/nearby-vendors"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Nearby Vendors</div>
                          <div className="text-xs text-muted-foreground">Find vendors close to you</div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/consumer/orders"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">My Orders</div>
                          <div className="text-xs text-muted-foreground">Track your orders</div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/consumer/seasonal"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium">Seasonal Products</div>
                          <div className="text-xs text-muted-foreground">Discover what's fresh now</div>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/dashboard/analytics">
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        activeSection === "analytics" && "bg-accent text-accent-foreground"
                      )}
                    >
                      {t('nav.analytics')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      activeSection === "services" && "bg-accent text-accent-foreground"
                    )}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                      <li className="md:col-span-2">
                        <div className="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                          Our Services
                        </div>
                      </li>
                      <li>
                        <Link
                          to="/services/logistics"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Logistics & Delivery</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Fast and reliable transportation for your produce
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/farm-consulting"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Farm Consulting</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Expert advice to improve your agricultural practices
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/certifications"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Certifications</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get organic and quality certifications for your produce
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/financial"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Financial Services</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Loans, insurance, and other financial tools for farmers
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      activeSection === "about" && "bg-accent text-accent-foreground"
                    )}
                  >
                    About
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                      <li>
                        <Link
                          to="/about"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">About Us</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn about our mission and vision
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/team"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Our Team</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Meet the team behind Annadata
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contact"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Contact</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get in touch with us
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/faq"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">FAQ</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Frequently asked questions
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavMenu>
          </div>
          
          <div className="hidden md:flex space-x-4">
            <Button 
              variant="outline" 
              className="flex items-center space-x-2 bg-white hover:bg-gray-100"
              aria-label="Download App"
            >
              <Download className="w-4 h-4" />
              <span>Download App</span>
            </Button>
            <Button 
              className="bg-[#138808] hover:bg-[#0d6b06] text-white flex items-center space-x-2"
              aria-label="Join Movement"
            >
              <UserPlus className="w-4 h-4" />
              <span>Join Movement</span>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              onClick={() => setIsOpen(!isOpen)} 
              variant="ghost"
              className="text-gray-600 p-2 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X size={24} className="text-gray-800" aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="px-4 py-3 space-y-3 bg-white shadow-lg rounded-b-xl max-h-[80vh] overflow-y-auto">
          <Link 
            to="/" 
            className={cn(
              "block px-3 py-2 hover:bg-gray-100 rounded-md",
              activeSection === "home" ? "text-[#138808] font-medium" : "text-gray-700"
            )}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          
          {/* Mobile Farmers Dropdown */}
          <div className="space-y-2">
            <div className={cn(
              "font-medium px-3 py-2",
              activeSection === "farmers" ? "text-[#138808]" : "text-gray-700"
            )}>Farmers</div>
            <Link 
              to="/dashboard/farmer" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Farmer Dashboard
            </Link>
            <Link 
              to="/farmer/products" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/agriculture/crop-health"
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Crop Health
            </Link>
            <Link 
              to="/market-prices"
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Market Prices
            </Link>
          </div>
          
          {/* Mobile Vendors Dropdown */}
          <div className="space-y-2">
            <div className={cn(
              "font-medium px-3 py-2",
              activeSection === "vendors" ? "text-[#138808]" : "text-gray-700"
            )}>Vendors</div>
            <Link 
              to="/dashboard/vendor" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Vendor Dashboard
            </Link>
            <Link 
              to="/vendor/marketplace" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Marketplace
            </Link>
            <Link 
              to="/vendor/analytics" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Sales Analytics
            </Link>
            <Link 
              to="/vendor/resources" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Resources
            </Link>
          </div>
          
          {/* Mobile Consumers Dropdown */}
          <div className="space-y-2">
            <div className={cn(
              "font-medium px-3 py-2",
              activeSection === "consumers" ? "text-[#138808]" : "text-gray-700"
            )}>Consumers</div>
            <Link 
              to="/dashboard/consumer" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Consumer Dashboard
            </Link>
            <Link 
              to="/consumer/nearby-vendors" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Nearby Vendors
            </Link>
            <Link 
              to="/consumer/orders" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              My Orders
            </Link>
            <Link 
              to="/consumer/seasonal" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Seasonal Products
            </Link>
          </div>
          
          <Link 
            to="/dashboard/analytics" 
            className={cn(
              "block px-3 py-2 hover:bg-gray-100 rounded-md",
              activeSection === "analytics" ? "text-[#138808] font-medium" : "text-gray-700"
            )}
            onClick={() => setIsOpen(false)}
          >
            Market Analytics
          </Link>
          
          {/* Services section in mobile view */}
          <div className="space-y-2">
            <div className={cn(
              "font-medium px-3 py-2",
              activeSection === "services" ? "text-[#138808]" : "text-gray-700"
            )}>Services</div>
            <Link 
              to="/services/logistics" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Logistics & Delivery
            </Link>
            <Link 
              to="/services/farm-consulting" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Farm Consulting
            </Link>
            <Link 
              to="/services/certifications" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Certifications
            </Link>
            <Link 
              to="/services/financial" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Financial Services
            </Link>
          </div>
          
          {/* About section in mobile view */}
          <div className="space-y-2">
            <div className={cn(
              "font-medium px-3 py-2",
              activeSection === "about" ? "text-[#138808]" : "text-gray-700"
            )}>About</div>
            <Link 
              to="/about" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/team" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Our Team
            </Link>
            <Link 
              to="/contact" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/faq" 
              className="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
          </div>
          
          <div className="pt-2 space-y-3">
            <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download App</span>
            </Button>
            <Button className="w-full bg-[#138808] hover:bg-[#0d6b06] text-white flex items-center justify-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Join Movement</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationMenu;
