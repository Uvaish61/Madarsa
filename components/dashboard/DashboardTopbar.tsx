"use client";

import { Bell, LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardTopbar() {
  const router = useRouter();
  const { logout, user } = useAuth();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div
      className="flex h-full flex-1 items-center justify-between px-7"
    >
      {/* Left: label + welcome */}
      <div>
        <p
          className="uppercase"
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "#16c564",
          }}
        >
          Dashboard
        </p>
        <h1
          style={{
            fontSize: "21px",
            fontWeight: 800,
            color: "#0d1f13",
            letterSpacing: "-0.4px",
          }}
        >
          Welcome back, {user?.name || "Student"}
        </h1>
      </div>

      {/* Right: search + bell + logout */}
      <div className="flex items-center" style={{ gap: 10 }}>
        {/* Search pill */}
        <div
          className="flex items-center gap-2"
          style={{
            padding: "8px 14px",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 10,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Search className="h-4 w-4 shrink-0" style={{ color: "#9aa59f" }} />
          <input
            type="text"
            placeholder="Search courses…"
            className="w-40 border-0 bg-transparent p-0 outline-none placeholder:text-[#9aa59f]"
            style={{ fontSize: "13px", fontWeight: 500, color: "#0d1f13" }}
          />
        </div>

        {/* Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="dash-ctrl relative flex items-center justify-center"
          style={{ width: 38, height: 38, borderRadius: 10 }}
        >
          <Bell className="h-[18px] w-[18px]" style={{ color: "#444" }} />
          <span
            className="absolute rounded-full"
            style={{
              top: 8,
              right: 8,
              width: 7,
              height: 7,
              background: "#16c564",
              border: "2px solid #edf1ed",
            }}
          />
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="dash-ctrl flex items-center gap-2"
          style={{
            padding: "8px 15px",
            borderRadius: 10,
            fontSize: "13px",
            fontWeight: 600,
            color: "#444",
          }}
        >
          <LogOut className="h-4 w-4" style={{ color: "#444" }} />
          Logout
        </button>
      </div>
    </div>
  );
}
