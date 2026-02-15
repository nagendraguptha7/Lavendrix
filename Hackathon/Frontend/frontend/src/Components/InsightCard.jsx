export default function InsightCard({ title, children }) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
      <div className="text-sm font-semibold text-slate-700">{title}</div>
      <div className="mt-3 text-sm text-slate-600">{children}</div>
    </div>
  );
}
