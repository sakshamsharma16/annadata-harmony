
import { Menu, X } from 'lucide-react';
import { NavItem } from './nav-items';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  isScrolled: boolean;
  activeDropdown: string;
  toggleMenu: () => void;
  toggleDropdown: (name: string) => void;
  handleItemClick: () => void;
}

const MobileMenu = ({
  isOpen,
  isScrolled,
  activeDropdown,
  toggleMenu,
  toggleDropdown,
  handleItemClick
}: MobileMenuProps) => {
  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-gray-600 p-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X size={24} className="text-gray-800" />
        ) : (
          <Menu size={24} />
        )}
      </button>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-3 space-y-3 bg-white shadow-lg rounded-b-xl">
          <NavItem path="/" name="Home" isActive={false} onClick={handleItemClick} />
          
          {/* Mobile Dropdowns */}
          {['farmers', 'vendors', 'consumers'].map((section) => (
            <div key={section}>
              <button
                onClick={() => toggleDropdown(`mobile-${section}`)}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md capitalize"
              >
                {section}
              </button>
              
              <div className={cn(
                "pl-4 mt-1 space-y-1 overflow-hidden transition-all duration-200",
                activeDropdown === `mobile-${section}` ? "max-h-40" : "max-h-0"
              )}>
                <NavItem 
                  path={`/dashboard/${section}`} 
                  name={`${section} Dashboard`}
                  isActive={false}
                  onClick={handleItemClick}
                />
              </div>
            </div>
          ))}
          
          <div className="pt-2 space-y-3">
            <Button className="w-full btn-secondary flex items-center justify-center">
              Download App
            </Button>
            <Button className="w-full btn-primary flex items-center justify-center">
              Join Movement
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
