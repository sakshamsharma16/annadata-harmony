
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
const AdminPortalLink = () => (
  <div className="mt-8 text-center">
    <Link to="/admin-login" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300">
      <Lock className="h-4 w-4 mr-1" />
      <span>Admin Portal</span>
    </Link>
  </div>
);
export default AdminPortalLink;
