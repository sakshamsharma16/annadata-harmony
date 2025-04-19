
import { useNavigationState } from '@/hooks/use-navigation-state';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItem, NavDropdown, NavActionButtons } from './navigation/nav-items';
import MobileMenu from './navigation/mobile-menu';

const NavigationMenu = () => {
  const location = useLocation();
  const { 
    isMenuOpen, 
    setIsMenuOpen, 
    isScrolled, 
    activeDropdown, 
    toggleDropdown, 
    closeMenu 
  } = useNavigationState();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled ? "navbar-scrolled py-2" : "bg-white/50 backdrop-blur-md border-b border-gray-200 py-4"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 font-bold text-2xl text-primary">
            Annadata
          </div>
          
          <div className="hidden md:flex space-x-1 lg:space-x-2">
            <NavItem path="/" name="Home" isActive={isActive("/")} />
            
            {/* Desktop Dropdowns */}
            {['farmers', 'vendors', 'consumers'].map((section) => (
              <NavDropdown
                key={section}
                label={section.charAt(0).toUpperCase() + section.slice(1)}
                isOpen={activeDropdown === section}
                onToggle={() => toggleDropdown(section)}
              >
                <NavItem 
                  path={`/dashboard/${section}`}
                  name={`${section} Dashboard`}
                  isActive={isActive(`/dashboard/${section}`)}
                  onClick={closeMenu}
                />
              </NavDropdown>
            ))}
            
            <NavItem 
              path="/dashboard/analytics"
              name="Market Analytics"
              isActive={isActive("/dashboard/analytics")}
            />
            
            <NavItem 
              path="/contact"
              name="Contact"
              isActive={isActive("/contact")}
            />
          </div>
          
          <NavActionButtons />
          
          <MobileMenu
            isOpen={isMenuOpen}
            isScrolled={isScrolled}
            activeDropdown={activeDropdown}
            toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
            toggleDropdown={toggleDropdown}
            handleItemClick={closeMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
