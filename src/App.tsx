
import React, { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <StrictMode>
      <Router>
        <AppProviders>
          <AppRoutes />
        </AppProviders>
      </Router>
    </StrictMode>
  );
};

export default App;
