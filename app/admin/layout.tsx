// app/dashboard/layout.tsx
"use client";

// import { Sidebar } from "@/components/layout/sidebar";
// import { Header } from "@/components/layout/header";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks/useRedux";
// import { setMobileSidebarOpen, setSidebarOpen } from "@/lib/redux/features/uiSlice";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setMobileSidebarOpen } from "@/redux/uiSlice";
// import { Sidebar } from "@/components/user/Sidebar";
import { Header } from "@/components/user/Header";
import { Sidebar } from "@/components/admin/Sidebar";
import { ProtectedRoute } from "@/components/Protect";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { mobileSidebarOpen, sidebarOpen } = useSelector((state:any) => state.ui);
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    if (mobileSidebarOpen) {
      dispatch(setMobileSidebarOpen(false));
    }
  }, [pathname, dispatch]);

  // Handle window resize - close mobile sidebar when going to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileSidebarOpen) {
        dispatch(setMobileSidebarOpen(false));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileSidebarOpen, dispatch]);

  return (
    <ProtectedRoute allowedRole="admin">
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-all duration-300 md:hidden ${
          mobileSidebarOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch(setMobileSidebarOpen(false))}
      />
      
      {/* Sidebar Component */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div
        className={`flex min-h-screen flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:pl-64" : "md:pl-20"
        }`}
      >
        <Header />
        <main className="flex-1">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
             
      {children}

          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-6 mt-auto">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© 2024 NexusBank. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </ProtectedRoute>
  );
}