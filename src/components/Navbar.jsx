import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-green-600">
          Cridaa
        </Link>

        {/* NAV LINKS */}
        <nav className="flex gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-green-600" : "text-gray-700"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-green-600" : "text-gray-700"
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-green-600" : "text-gray-700"
            }
          >
            Contact Us
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
