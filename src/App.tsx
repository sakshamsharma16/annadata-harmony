
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import AppRoutes from "./routes/AppRoutes";

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
      <RouterProvider router={router} />
    </AppProviders>
  );
};

export default App;
