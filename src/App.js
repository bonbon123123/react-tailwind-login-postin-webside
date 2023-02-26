import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/loginpage';
import Profile from './pages/userprofile';
import useToken from './useToken';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}




function App() {
  const { token, setToken } = useToken();


  return (


    <div>
      <Router>
        <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <svg
              className="fill-current h-8 w-8 mr-2"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h54v54H0z" fill="none" />
              <path
                d="M27 0c14.912 0 27 12.088 27 27s-12.088 27-27 27S0 41.912 0 27 12.088 0 27 0zm-3.66 40.603L31.076 29.1H21.192l7.148 11.503zm-5.063-17.705h10.788L25.95 10.397l-7.673 12.501zM9.808 27c0-7.426 6.028-13.454 13.454-13.454 4.727 0 8.916 2.429 11.34 6.114L19.922 29.114C17.498 25.429 13.309 23 8.808 23c-5.522 0-10 4.477-10 10s4.478 10 10 10c4.501 0 8.69-2.429 11.114-6.114l14.68 9.442c-2.424 3.684-6.613 6.114-11.114 6.114C15.836 40.454 9.808 34.426 9.808 27z"
                fill="#FFF"
              />
            </svg>
            <span className="font-semibold text-xl tracking-tight">My App</span>
          </div>
          {/* Links */}
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-300 hover:border-gray-300">
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path
                  d="M0 2.5A2.5 2.5 0 015 0h10a2.5 2.5 0 012.5 2.5v1.25H0V2.5zm0 6.25v6.25h17.5v-6.25H0zm0 8.75V20h17.5v-2.5H0z"
                />
              </svg>
            </button>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <Link
                to="#"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4"
              >
                Features
              </Link>
              <Link
                to="#"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white mr-4"
              >
                Pricing
              </Link>
              <Link
                to="#"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-white"
              >
                Contact
              </Link>
            </div>
            {/* Buttons */}
            {token ?
              <div className="ml-4">
                <Link
                  to="/profile"
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-900 hover:bg-white mt-4 lg:mt-0"
                >
                  Profile
                </Link>
              </div>
              :
              <div className="ml-4">
                <Link
                  to="/"
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-900 hover:bg-white mt-4 lg:mt-0"
                >
                  Log In
                </Link>
              </div>
            }
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/profile" element={token ? <Profile token={token} /> : <Login setToken={setToken} />} />

        </Routes>
      </Router>
    </div>

  );
}

export default App;
