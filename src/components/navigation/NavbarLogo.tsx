
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-[#138808] rounded-full flex items-center justify-center">
        <Leaf className="h-5 w-5 text-white" />
      </div>
      <span className="font-bold text-xl text-[#138808]">ANNADATA</span>
    </Link>
  );
};

export default NavbarLogo;
