import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a3a32] py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">KeenKeeper</h2>
          <p className="max-w-md text-gray-300 mb-8">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>

          <div className="mb-12">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Social Links</h3>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1a3a32] transition-transform hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1a3a32] transition-transform hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1a3a32] transition-transform hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
