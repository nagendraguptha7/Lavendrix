export default function LoadingSpinner({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="25" cy="25" r="20" strokeWidth="4" stroke="#cbd5e1" fill="none" />
      <path d="M45 25a20 20 0 00-20-20" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}
