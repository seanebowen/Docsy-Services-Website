import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const CAROLINA = "#4B9CD3";
const TERMINAL = "#00251b";
const CLOUD = "#f4ffff";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6" style={{ backgroundColor: TERMINAL }}>
      <h1 className="text-6xl font-bold mb-4" style={{ color: CAROLINA }}>404</h1>
      <p className="text-xl font-bold mb-2" style={{ color: CLOUD }}>Page Not Found</p>
      <p className="text-sm mb-8" style={{ color: `${CLOUD}66` }}>The page you're looking for doesn't exist or has been moved.</p>
      <Link
        href="/"
        className="group inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
        style={{ backgroundColor: CAROLINA, color: CLOUD, boxShadow: `0 4px 14px ${CAROLINA}33` }}
      >
        Back to Home <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}
