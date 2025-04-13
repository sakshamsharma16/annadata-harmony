
import LanguageSelector from "./LanguageSelector";
import NavbarLogo from "./navigation/NavbarLogo";
import NavbarDesktopMenu from "./navigation/NavbarDesktopMenu";
import NavbarUserActions from "./navigation/NavbarUserActions";
import NavbarMobileMenu from "./navigation/NavbarMobileMenu";
import useNavbarState from "./navigation/useNavbarState";

const AppNavbar = () => {
  const { scrolled, isAuthenticated, userRole, dashboardLink } = useNavbarState();
  
  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${
      scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-[#F2FCE2]"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <NavbarLogo />
            <NavbarDesktopMenu />
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSelector />
            
            <NavbarUserActions 
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              dashboardLink={dashboardLink}
            />
            
            <NavbarMobileMenu 
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              dashboardLink={dashboardLink}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
