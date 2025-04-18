
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import AppRoutes from "./routes/AppRoutes";
import SupabaseTestLink from "./components/SupabaseTestLink";
import { Toaster } from "./components/ui/toaster";

const App: React.FC = () => {
  return (
    <Router>
      <AppProviders>
        <AppRoutes />
        <SupabaseTestLink />
        <Toaster />
      </AppProviders>
    </Router>
  );
};

export default App;
