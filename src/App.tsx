
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Router>
        <AppProviders>
          <AppRoutes />
        </AppProviders>
      </Router>
    </React.StrictMode>
  );
};

export default App;
