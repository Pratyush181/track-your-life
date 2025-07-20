
"use client"
import React from "react";

const PALETTE = [
  { label: "Primary", className: "bg-primary text-primary-content" },
  { label: "Secondary", className: "bg-secondary text-secondary-content" },
  { label: "Accent", className: "bg-accent text-accent-content" },
  { label: "Neutral", className: "bg-neutral text-neutral-content" },
  { label: "Base 100", className: "bg-base-100 text-base-content border" },
  { label: "Base 200", className: "bg-base-200 text-base-content border" },
  { label: "Base 300", className: "bg-base-300 text-base-content border" },
  { label: "Info", className: "bg-info text-info-content" },
  { label: "Success", className: "bg-success text-success-content" },
  { label: "Warning", className: "bg-warning text-warning-content" },
  { label: "Error", className: "bg-error text-error-content" },
];

export default function ThemePalette() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content p-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">DaisyUI Theme Palette</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PALETTE.map(({ label, className }) => (
          <div key={label} className="flex flex-col items-center border rounded-lg p-4 bg-base-200 shadow">
            <div
              className={`w-16 h-16 rounded mb-2 border-2 ${className}`}
            />
            <div className="text-sm font-medium text-center mt-2">{label}</div>
            <div className="text-xs text-base-content/60 text-center">{className.split(" ")[0]}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-base-content/60">
        <p>This palette reflects your current DaisyUI theme using DaisyUI utility classes.</p>
      </div>
    </div>
  );
}