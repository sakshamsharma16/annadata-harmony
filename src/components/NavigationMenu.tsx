
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavigationMenu as NavMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Download, UserPlus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

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

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? "navbar-scrolled py-2" : "bg-white/50 backdrop-blur-md border-b border-gray-200 py-4"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 font-bold text-2xl text-primary">
            Annadata
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavMenu className="relative z-[100]">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {t('nav.home')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t('nav.farmers')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-4">
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
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t('nav.vendors')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-4">
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
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t('nav.consumers')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-4">
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
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/dashboard/analytics">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {t('nav.analytics')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>About</NavigationMenuTrigger>
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
            <Button variant="outline" className="btn-secondary flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download App
            </Button>
            <Button className="btn-primary flex items-center">
              <UserPlus className="w-4 h-4 mr-2" />
              Join Movement
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
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="px-4 py-3 space-y-3 bg-white shadow-lg rounded-b-xl">
          <Link 
            to="/" 
            className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          
          {/* Mobile Farmers Dropdown */}
          <div className="space-y-2">
            <div className="font-medium px-3 py-2">Farmers</div>
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
          </div>
          
          {/* Mobile Vendors Dropdown */}
          <div className="space-y-2">
            <div className="font-medium px-3 py-2">Vendors</div>
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
          </div>
          
          {/* Mobile Consumers Dropdown */}
          <div className="space-y-2">
            <div className="font-medium px-3 py-2">Consumers</div>
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
          </div>
          
          <Link 
            to="/dashboard/analytics" 
            className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Market Analytics
          </Link>
          
          {/* About section in mobile view */}
          <div className="space-y-2">
            <div className="font-medium px-3 py-2">About</div>
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
            <Button variant="outline" className="w-full btn-secondary flex items-center justify-center">
              <Download className="w-4 h-4 mr-2" />
              Download App
            </Button>
            <Button className="w-full btn-primary flex items-center justify-center">
              <UserPlus className="w-4 h-4 mr-2" />
              Join Movement
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationMenu;
