
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "./components/ui/toaster";

// Create the router with the correct structure
const router = createBrowserRouter([
  {
    path: "*",
    element: <AppRoutes />
  }
]);

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <AppProviders>
        <RouterProvider router={router} />
        <Toaster />
      </AppProviders>
    </React.StrictMode>
  );
};

export default App;
