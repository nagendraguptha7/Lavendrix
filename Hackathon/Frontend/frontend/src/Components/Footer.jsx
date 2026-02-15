import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 dark:text-slate-300">
        <div>
          <div className="text-lg font-semibold text-slate-900 dark:text-white">AI Release Guard</div>
          <p className="mt-2">AI-assisted planning and vision-based QA for safe releases.</p>
        </div>

        <div className="flex gap-8">
          <div>
            <div className="font-semibold text-slate-800 dark:text-white">Company</div>
            <ul className="mt-2 space-y-1">
              <li>About</li>
              <li>Responsible AI</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-slate-800 dark:text-white">Info</div>
            <ul className="mt-2 space-y-1">
              <li>Docs</li>
              <li>Changelog</li>
              <li>Privacy</li>
            </ul>
          </div>
        </div>

        <div className="text-right">
          <div className="font-semibold text-slate-800 dark:text-white">Version</div>
          <div className="mt-2 text-slate-500 dark:text-slate-400">v0.1.0 — Track 5 Hackathon</div>
          <div className="mt-4 text-xs">© {new Date().getFullYear()} AI Release Guard</div>
        </div>
      </div>
    </footer>
  );
}
