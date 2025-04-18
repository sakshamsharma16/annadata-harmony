
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import AppRoutes from "./routes/AppRoutes";
import SupabaseTestLink from "./components/SupabaseTestLink";
import { Toaster } from "./components/ui/toaster";

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
      <SupabaseTestLink />
      <Toaster />
    </AppProviders>
  );
};

export default App;
