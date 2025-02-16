
import { CircleUserRound } from "lucide-react";

const WelcomePage = () => {
  return (
    <div className="min-h-screen gradient-background flex flex-col items-center justify-between p-6">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center flex-grow gap-8">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <img 
            src="/lovable-uploads/2ee574f8-3411-44c0-bc55-5715f17f8c0d.png" 
            alt="Annadata Logo" 
            className="w-32 h-32 mx-auto annadata-logo"
          />
          <h1 className="text-4xl font-bold">WELCOME TO ANNADATA</h1>
        </div>

        {/* QR Code Section */}
        <div className="glass-card p-6 w-full">
          <img 
            src="/lovable-uploads/357f3aec-9131-4b81-98b3-64e20811da4d.png"
            alt="QR Code"
            className="w-48 h-48 mx-auto mb-4"
          />
          <div className="flex items-center justify-center gap-2 text-xl">
            <CircleUserRound className="w-6 h-6" />
            <span>SCAN ME</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-lg max-w-md">
          A platform which farmers directly with consumers, eliminating middlemen. It ensures fair pricing and transparency.
        </p>

        {/* Continue Button */}
        <button className="btn-primary mt-4">Continue</button>
      </div>

      {/* Need Help Button */}
      <button className="need-help-button">
        <img 
          src="/lovable-uploads/2ee574f8-3411-44c0-bc55-5715f17f8c0d.png"
          alt="Help"
          className="w-6 h-6"
        />
        NEED HELP ?
      </button>
    </div>
  );
};

export default WelcomePage;
