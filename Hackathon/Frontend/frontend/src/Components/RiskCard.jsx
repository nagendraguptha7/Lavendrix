import React from "react";

const STATUS = {
  safe: {
    ring: "ring-2 ring-green-100",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  warning: {
    ring: "ring-2 ring-yellow-100",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  critical: {
    ring: "ring-2 ring-red-100",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
};

export default function RiskCard({ title, value, status = "safe", subtitle, className = "" }) {
  const s = STATUS[status] || STATUS.safe;
  return (
    <div className={`p-4 rounded-2xl border ${s.border} ${s.bg} transition-transform transform hover:scale-[1.01] ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-sm font-semibold ${s.text}`}>{title}</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{value}</div>
        </div>
        <div className="text-xs text-slate-500">{subtitle}</div>
      </div>
    </div>
  );
}
