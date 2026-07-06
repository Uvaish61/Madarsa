"use client";

import { Bell, Download, Star } from "lucide-react";

export default function CertificatesTopbar() {
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
          Achievements
        </p>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#0d1f13",
            letterSpacing: "-0.4px",
          }}
        >
          My Certificates
        </h1>
      </div>

      {/* Right: earned pill + bell + download */}
      <div className="flex items-center" style={{ gap: 10 }}>
        {/* Earned pill */}
        <div
          className="flex items-center"
          style={{
            gap: 6,
            padding: "8px 14px",
            background: "#fff",
            border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: 10,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Star style={{ width: 13, height: 13, color: "#daa520" }} className="fill-current" />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "#92700a" }}>1 Earned</span>
        </div>

        {/* Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="dash-ctrl cert-bell relative flex items-center justify-center"
          style={{ width: 36, height: 36, borderRadius: 9 }}
        >
          <Bell style={{ width: 14, height: 14, color: "#333" }} />
          <span
            className="absolute rounded-full"
            style={{ top: 7, right: 7, width: 6, height: 6, background: "#16c564" }}
          />
        </button>

        {/* Download PDF */}
        <button
          type="button"
          className="cert-download-btn flex items-center"
          style={{
            gap: 7,
            padding: "8px 16px",
            borderRadius: 10,
            border: "1px solid rgba(212,175,55,0.28)",
            background: "rgba(218,165,32,0.08)",
            fontSize: 13,
            fontWeight: 700,
            color: "#92700a",
            cursor: "pointer",
          }}
        >
          <Download style={{ width: 13, height: 13 }} />
          Download PDF
        </button>
      </div>
    </div>
  );
}
