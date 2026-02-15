import React from "react";

const STYLE = {
  Safe: "bg-green-50 text-green-800 border-green-200",
  Warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  Block: "bg-red-50 text-red-800 border-red-200",
};

export default function DecisionCard({ decision = "Safe", confidence = 92 }) {
  const cls = STYLE[decision] || STYLE.Safe;
  return (
    <div className={`p-4 rounded-2xl border ${cls} shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Release Decision</div>
          <div className="mt-2 text-2xl font-bold">{decision}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Confidence</div>
          <div className="mt-2 text-xl font-semibold">{confidence}%</div>
        </div>
      </div>
    </div>
  );
}
