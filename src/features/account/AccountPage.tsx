import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { User, ClipboardList, MapPin, Settings, LogOut } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { ProfileTab } from "./ProfileTab";
import { OrdersTab } from "./OrdersTab";
import { AddressesTab } from "./AddressesTab";
import { SettingsTab } from "./SettingsTab";

const TABS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "orders", label: "Orders", icon: ClipboardList },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "settings", label: "Settings", icon: Settings },
] as const;

export function AccountPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated, logout } = useAuth();
  const [tab, setTab] = useState<string>(searchParams.get("tab") || "profile");

  if (!isAuthenticated || !user) {
    return (
      <Container className="pt-10">
        <EmptyState
          icon={User}
          title="Sign in to view your account"
          body="Create an account or sign in to manage orders, addresses and your wishlist."
          action={<Button onClick={() => navigate(ROUTES.login)}>Sign in</Button>}
        />
      </Container>
    );
  }

  return (
    <Container className="pt-7 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Account" }]} />
      <SectionHeader title={`Hello, ${user.name.split(" ")[0]}`} sub="Track orders, manage saved works, and update your details." />
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,220px)_1fr] gap-9">
        <div>
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2.5 w-full text-left rounded-xl px-3 py-2.5 text-sm mb-1.5 ${
                tab === key ? "bg-surface-raised border border-line-strong" : "bg-transparent border border-transparent"
              }`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
          <button
            onClick={async () => {
              await logout();
              navigate(ROUTES.home);
            }}
            className="flex items-center gap-2.5 w-full text-left rounded-xl px-3 py-2.5 text-sm text-danger mt-2.5"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
        <div>
          {tab === "profile" && <ProfileTab />}
          {tab === "orders" && <OrdersTab />}
          {tab === "addresses" && <AddressesTab />}
          {tab === "settings" && <SettingsTab />}
        </div>
      </div>
    </Container>
  );
}
