import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import ScrollToTop from "@/components/common/ScrollToTop";
import PageTransition from "@/components/common/PageTransition";

// ✅ Lazy load pages for better performance
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Solutions = lazy(() => import("@/pages/Solutions"));
const Team = lazy(() => import("@/pages/Team"));
const Contact = lazy(() => import("@/pages/Contact"));

// ✅ Loading fallback component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin h-8 w-8 text-primary">Loading...</div>
    </div>
  );
}

// ✅ Main App Component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen flex flex-col w-full">
            {/* ✅ Navigation Bar */}
            <Navbar />
            
            {/* ✅ Main content with scroll and page transition */}
            <main className="flex-grow w-full">
              <ScrollToTop />
              <Suspense fallback={<LoadingSpinner />}>
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/solutions" element={<Solutions />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* ✅ Handle 404 - redirect to Home */}
                    <Route path="*" element={<Home />} />
                  </Routes>
                </PageTransition>
              </Suspense>
            </main>
            
            {/* ✅ Footer and Toaster Notifications */}
            <Footer />
            <Toaster />
          </div>
        </Router>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
