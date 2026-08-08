import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toasts } from "@/components/common/Toasts";
import { QuickViewModal } from "@/components/common/QuickViewModal";
import { ContactArtistModal } from "@/components/common/ContactArtistModal";

export function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />
      <Toasts />
      <QuickViewModal />
      <ContactArtistModal />
    </div>
  );
}
