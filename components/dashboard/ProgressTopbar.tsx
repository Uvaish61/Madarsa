"use client";

import { Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

type Period = "Week" | "Month" | "All Time";

export default function ProgressTopbar() {
  const router = useRouter();
  const { logout } = useAuth();
  const [period, setPeriod] = useState<Period>("Week");

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="flex h-full flex-1 items-center justify-between px-7">
      {/* Left: page label + title */}
      <div>
        <p
          className="uppercase"
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.13em",
            color: "#16c564",
          }}
        >
          Progress
        </p>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#0d1f13",
            letterSpacing: "-0.4px",
          }}
        >
          Track your learning journey
        </h1>
      </div>

      {/* Right: period toggle + bell + logout */}
      <div className="flex items-center" style={{ gap: 10 }}>

        {/* Period toggle pill */}
        <div
          style={{
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 10,
            padding: 4,
            display: "flex",
            gap: 2,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          {(["Week", "Month", "All Time"] as Period[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              style={{
                padding: "5px 12px",
                borderRadius: 7,
                fontSize: 12,
                fontWeight: period === p ? 700 : 600,
                color: period === p ? "#fff" : "#7a8c81",
                background:
                  period === p
                    ? "linear-gradient(135deg, #16c564, #0d9444)"
                    : "transparent",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.18s ease, color 0.18s ease",
              }}
              className={period !== p ? "period-pill-inactive" : ""}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="dash-ctrl relative flex items-center justify-center"
          style={{ width: 36, height: 36, borderRadius: 9 }}
        >
          <Bell style={{ width: 14, height: 14, color: "#333" }} />
          <span
            className="absolute rounded-full"
            style={{
              top: 7,
              right: 7,
              width: 6,
              height: 6,
              background: "#16c564",
            }}
          />
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="dash-ctrl flex items-center gap-1.5"
          style={{
            padding: "7px 14px",
            borderRadius: 9,
            fontSize: "12.5px",
            fontWeight: 600,
            color: "#444",
          }}
        >
          <LogOut style={{ width: 13, height: 13, color: "#444" }} />
          Logout
        </button>
      </div>
    </div>
  );
}
