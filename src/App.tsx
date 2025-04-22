
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import AppRoutes from "./routes/AppRoutes";
import SEOHandler from "./components/SEOHandler";

// Create the router with the correct structure
const router = createBrowserRouter([
  {
    path: "*",
    element: <AppRoutes />
  }
]);

const App: React.FC = () => {
  return (
    <AppProviders>
      <SEOHandler />
      <RouterProvider router={router} />
    </AppProviders>
  );
};

export default App;
