"use client";

import { Bell, Pencil } from "lucide-react";

export default function ProfileTopbar() {
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
          ACCOUNT
        </p>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#0d1f13",
            letterSpacing: "-0.4px",
          }}
        >
          Profile
        </h1>
      </div>

      {/* Right: status pill + bell + edit profile */}
      <div className="flex items-center" style={{ gap: 10 }}>
        {/* Online status pill */}
        <div
          className="flex items-center"
          style={{
            gap: 8,
            padding: "7px 14px",
            borderRadius: 10,
            background: "#fff",
            border: "1px solid rgba(22,197,100,0.2)",
          }}
        >
          <span
            className="profile-status-dot shrink-0 rounded-full"
            style={{ width: 7, height: 7, background: "#16c564" }}
          />
          <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#14a35a" }}>
            Online
          </span>
          <div className="flex items-end" style={{ gap: 2, height: 13 }}>
            <span
              className="profile-wave-bar-1"
              style={{ width: 2, background: "#16c564", borderRadius: 1 }}
            />
            <span
              className="profile-wave-bar-2"
              style={{ width: 2, background: "#16c564", borderRadius: 1 }}
            />
            <span
              className="profile-wave-bar-3"
              style={{ width: 2, background: "#16c564", borderRadius: 1 }}
            />
          </div>
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

        {/* Edit Profile */}
        <button
          type="button"
          className="profile-edit-btn flex items-center"
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
          <Pencil style={{ width: 13, height: 13 }} />
          Edit Profile
        </button>
      </div>
    </div>
  );
}
