import React from "react";

export default function Tooltip({ children, tip = "", className = "" }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      {tip && (
        <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {tip}
        </div>
      )}
    </div>
  );
}
