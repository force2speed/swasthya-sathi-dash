import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/alerts" element={
            <DashboardLayout>
              <Alerts />
            </DashboardLayout>
          } />
          <Route path="/reports" element={
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          } />
          <Route path="/analytics" element={
            <DashboardLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Analytics</h1>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/villages" element={
            <DashboardLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Village Management</h1>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/resources" element={
            <DashboardLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Resource Management</h1>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </DashboardLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
