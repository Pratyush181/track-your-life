
"use client"
import React from "react";

const PALETTE = [
  // Core
  { label: "Background", var: "--background" },
  { label: "Foreground", var: "--foreground" },
  { label: "Card", var: "--card" },
  { label: "Card Foreground", var: "--card-foreground" },
  { label: "Popover", var: "--popover" },
  { label: "Popover Foreground", var: "--popover-foreground" },
  // Primary/Secondary/Accent
  { label: "Primary", var: "--primary" },
  { label: "Primary Foreground", var: "--primary-foreground" },
  { label: "Secondary", var: "--secondary" },
  { label: "Secondary Foreground", var: "--secondary-foreground" },
  { label: "Muted", var: "--muted" },
  { label: "Muted Foreground", var: "--muted-foreground" },
  { label: "Accent", var: "--accent" },
  { label: "Accent Foreground", var: "--accent-foreground" },
  { label: "Destructive", var: "--destructive" },
  // Borders/Inputs
  { label: "Border", var: "--border" },
  { label: "Input", var: "--input" },
  { label: "Ring", var: "--ring" },
  // Chart
  { label: "Chart 1", var: "--chart-1" },
  { label: "Chart 2", var: "--chart-2" },
  { label: "Chart 3", var: "--chart-3" },
  { label: "Chart 4", var: "--chart-4" },
  { label: "Chart 5", var: "--chart-5" },
  // Sidebar
  { label: "Sidebar", var: "--sidebar" },
  { label: "Sidebar Foreground", var: "--sidebar-foreground" },
  { label: "Sidebar Primary", var: "--sidebar-primary" },
  { label: "Sidebar Primary Foreground", var: "--sidebar-primary-foreground" },
  { label: "Sidebar Accent", var: "--sidebar-accent" },
  { label: "Sidebar Accent Foreground", var: "--sidebar-accent-foreground" },
  { label: "Sidebar Border", var: "--sidebar-border" },
  { label: "Sidebar Ring", var: "--sidebar-ring" },
];

function getCssVarValue(cssVar: string) {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
}

export default function ThemePalette() {
  const [values, setValues] = React.useState<{ [key: string]: string }>({});
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const vals: { [key: string]: string } = {};
    PALETTE.forEach(({ var: v }) => {
      vals[v] = getCssVarValue(v);
    });
    setValues(vals);
    // Set initial mode
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDark = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      setIsDark(true);
    }
    // Update values after mode change
    setTimeout(() => {
      const vals: { [key: string]: string } = {};
      PALETTE.forEach(({ var: v }) => {
        vals[v] = getCssVarValue(v);
      });
      setValues(vals);
    }, 10);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Theme Palette</h1>
        <button
          onClick={toggleDark}
          className="px-4 py-2 rounded bg-primary text-primary-foreground shadow hover:brightness-95 border border-border transition"
        >
          {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PALETTE.map(({ label, var: v }) => (
          <div key={v} className="flex flex-col items-center border rounded-lg p-4 bg-card shadow">
            <div
              className="w-16 h-16 rounded mb-2 border"
              style={{ background: `var(${v})` }}
            />
            <div className="text-sm font-medium text-center">{label}</div>
            <div className="text-xs text-muted-foreground text-center">{v}</div>
            <div className="text-xs mt-1 text-center">
              {values[v] || <span className="italic text-muted-foreground">(computed on client)</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-muted-foreground">
        <p>Toggle your app's dark mode to preview both palettes.</p>
      </div>
    </div>
  );
}