
import { Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 font-bold text-2xl text-primary">
            Annadata
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#farmers" className="text-gray-600 hover:text-primary transition-colors">Farmers</a>
            <a href="#vendors" className="text-gray-600 hover:text-primary transition-colors">Vendors</a>
            <a href="#consumers" className="text-gray-600 hover:text-primary transition-colors">Consumers</a>
            <a href="#investors" className="text-gray-600 hover:text-primary transition-colors">Investors</a>
          </div>
          
          <div className="hidden md:flex space-x-4">
            <button className="btn-secondary">Download App</button>
            <button className="btn-primary">Join Movement</button>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b">
            <a href="#farmers" className="block px-3 py-2 text-gray-600">Farmers</a>
            <a href="#vendors" className="block px-3 py-2 text-gray-600">Vendors</a>
            <a href="#consumers" className="block px-3 py-2 text-gray-600">Consumers</a>
            <a href="#investors" className="block px-3 py-2 text-gray-600">Investors</a>
            <button className="w-full btn-secondary my-2">Download App</button>
            <button className="w-full btn-primary">Join Movement</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
