
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ChevronDown, Download, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  path: string;
  name: string;
  isActive: boolean;
  onClick?: () => void;
}

export const NavItem = ({ path, name, isActive, onClick }: NavItemProps) => (
  <Link
    to={path}
    className={cn(
      "px-3 py-2 text-gray-700 hover:text-primary transition-colors rounded-md hover:bg-gray-100",
      isActive && "text-primary bg-gray-100"
    )}
    onClick={onClick}
  >
    {name}
  </Link>
);

interface NavDropdownProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const NavDropdown = ({ label, isOpen, onToggle, children }: NavDropdownProps) => (
  <div className="relative group">
    <button
      onClick={onToggle}
      className="px-3 py-2 text-gray-700 hover:text-primary transition-colors rounded-md hover:bg-gray-100 flex items-center"
    >
      {label}
      <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
    {isOpen && (
      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20 animate-fade-up">
        {children}
      </div>
    )}
  </div>
);

export const NavActionButtons = () => (
  <div className="hidden md:flex space-x-4">
    <Button className="btn-secondary flex items-center">
      <Download className="w-4 h-4 mr-2" />
      Download App
    </Button>
    <Button className="btn-primary flex items-center">
      <UserPlus className="w-4 h-4 mr-2" />
      Join Movement
    </Button>
  </div>
);
