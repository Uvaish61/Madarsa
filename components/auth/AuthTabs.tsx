"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Tab switcher between Sign-up and Sign-in. Lives as a client component so it can
// carry the ?redirect= param across tabs — otherwise a user mid-purchase who
// switches from Sign-in to Create-Account would lose their course destination.
export default function AuthTabs({ activeTab }: { activeTab: "signup" | "login" }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const redirect = new URLSearchParams(window.location.search).get("redirect");
    setQuery(redirect ? `?redirect=${encodeURIComponent(redirect)}` : "");
  }, []);

  return (
    <div className="grid grid-cols-2 border-b border-line">
      <TabLink href={`/signup${query}`} active={activeTab === "signup"}>
        Create Account
      </TabLink>
      <TabLink href={`/login${query}`} active={activeTab === "login"}>
        Sign In
      </TabLink>
    </div>
  );
}

function TabLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`-mb-px border-b-2 pb-3 text-center text-[15px] font-bold transition ${
        active ? "border-green-600 text-green-700" : "border-transparent text-muted hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}
