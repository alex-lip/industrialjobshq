import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-steel-800 text-steel-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold text-white">
                Industrial Jobs HQ
              </span>
            </Link>
            <p className="text-steel-400 max-w-md">
              The premier job board for industrial sales professionals. Find your
              next opportunity in manufacturing, automation, and industrial
              equipment sales.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs"
                  className="text-steel-400 hover:text-white transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-steel-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-steel-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Popular Locations</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs/in/ohio/columbus"
                  className="text-steel-400 hover:text-white transition-colors"
                >
                  Columbus, OH
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/in/michigan/detroit"
                  className="text-steel-400 hover:text-white transition-colors"
                >
                  Detroit, MI
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/in/illinois/chicago"
                  className="text-steel-400 hover:text-white transition-colors"
                >
                  Chicago, IL
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-steel-700 mt-8 pt-8 text-center text-steel-400">
          <p>&copy; {currentYear} Industrial Jobs HQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
