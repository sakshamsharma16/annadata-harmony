
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <Leaf className="h-6 w-6 text-[#138808]" />
      <span className="font-bold text-xl">ANNADATA</span>
    </Link>
  );
};

export default NavbarLogo;
