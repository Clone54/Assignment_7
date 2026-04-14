import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
        <AlertCircle className="h-10 w-10" />
      </div>
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-[#1a3a32] sm:text-5xl">404</h1>
      <p className="mb-8 text-lg text-gray-500">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full bg-[#1a3a32] px-6 py-3 font-semibold text-white transition-transform hover:scale-105 active:scale-95"
      >
        <Home className="h-5 w-5" />
        Back to Home
      </Link>
    </div>
  );
}
