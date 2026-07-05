"use client";

import { Bell, Check } from "lucide-react";

export default function SettingsTopbar() {
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
          Settings
        </h1>
      </div>

      {/* Right: bell + save changes */}
      <div className="flex items-center" style={{ gap: 10 }}>
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

        {/* Save Changes */}
        <button
          type="button"
          className="settings-save-btn flex items-center"
          style={{
            gap: 7,
            padding: "8px 18px",
            borderRadius: 10,
            border: "none",
            background: "linear-gradient(135deg, #16c564, #0d9444)",
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <Check style={{ width: 13, height: 13 }} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
