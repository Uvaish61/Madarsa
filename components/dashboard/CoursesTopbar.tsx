"use client";

import { Bell, Plus, Search } from "lucide-react";

export default function CoursesTopbar() {
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
          Learning
        </p>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#0d1f13",
            letterSpacing: "-0.4px",
          }}
        >
          My Courses
        </h1>
      </div>

      {/* Right: search + bell + browse */}
      <div className="flex items-center" style={{ gap: 10 }}>
        {/* Search bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 10,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Search style={{ width: 13, height: 13, color: "#9aa59f" }} />
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#9aa59f",
              userSelect: "none",
            }}
          >
            Search courses…
          </span>
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

        {/* Browse All */}
        <button
          type="button"
          className="continue-btn flex items-center"
          style={{
            gap: 7,
            padding: "8px 16px",
            borderRadius: 10,
            border: "none",
            background: "linear-gradient(135deg, #16c564, #0d9444)",
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <Plus style={{ width: 13, height: 13 }} />
          Browse All
        </button>
      </div>
    </div>
  );
}
