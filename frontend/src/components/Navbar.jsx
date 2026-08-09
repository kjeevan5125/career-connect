import React from 'react';
import logo from '../images/logo.png';
import { NavLink,useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {getUserFromToken} from '../utils/auth';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token')
  );

  const user = getUserFromToken();

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    }

    window.addEventListener("authChange",checkAuth);
    return () => {
      window.removeEventListener("authChange",checkAuth);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    navigate('/login');
  }

  const linkClass = ({isActive}) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">

              {/* Logo */}
              <NavLink
                className="flex flex-shrink-0 items-center mr-4"
                to="/"
              >
                <img
                  className="h-10 w-auto"
                  src={logo}
                  alt="Career Connect"
                />
                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  Career Connect
                </span>
              </NavLink>

              <div className="md:ml-auto">
                <div className="flex space-x-2">
                  <NavLink
                    to="/"
                      className={linkClass}
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/jobs"
                    className={linkClass}
                  >
                    Jobs
                  </NavLink>

                  {user?.role === "candidate" && (
                    <NavLink
                      to="/my-applications"
                      className={linkClass}
                    >
                      My Applications
                    </NavLink>
                  )}

                  {user?.role=="employer" &&(
                    <NavLink
                      to="/add-job"
                      className={linkClass}
                    >
                      Add Job
                    </NavLink>
                  )}

                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >
                      Logout
                    </button>
                  ) : (
                    <NavLink
                      to="/login"
                      className={linkClass}
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar