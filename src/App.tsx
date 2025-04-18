
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import AppRoutes from "./routes/AppRoutes";
import SupabaseTestLink from "./components/SupabaseTestLink";

const App: React.FC = () => {
  return (
    <Router>
      <AppProviders>
        <AppRoutes />
        <SupabaseTestLink />
      </AppProviders>
    </Router>
  );
};

export default App;
