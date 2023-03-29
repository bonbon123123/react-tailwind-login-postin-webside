import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/loginPage';
import Profile from './pages/userProfile';
import Main from './pages/mainPage';
import Admin from './pages/adminPage';
import useToken from './useToken';
import PasswordChange from './components/passwordChane';
import Group from "./pages/groupPage"
import axios from 'axios';





function App() {
  const { token, setToken } = useToken();

  async function logout(user) {
    try {
      const formData = new FormData();
      let jsonData = {
        user: user,
        status: "offline"
      }
      formData.append('jsonData', JSON.stringify(jsonData));

      const URL = "http://localhost:3001/handleStatus"
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'timeout': 5000,
        }
      };
      const result = await axios.post(URL, formData, config)

      sessionStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
    return "Are you sure you want to leave this page?";
  }


  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      if (token && performance.navigation.type !== PerformanceNavigation.TYPE_RELOAD) {
        event.preventDefault();
        const confirmationMessage = await logout(token.user);
        event.returnValue = confirmationMessage;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [token]);



  return (


    <div>
      {token ?
        token.status == "not_activated" ?
          <PasswordChange token={token} />
          :
          <Router>

            <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900">
              <div class="container flex flex-wrap items-center justify-between mx-auto">
                <a href="https://flowbite.com/" class="flex items-center">
                  <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
                  <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Bonbon</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                  <span class="sr-only">Open main menu</span>
                  <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                  <div class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                    <div className="ml-4">
                      <Link
                        to="/group"
                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-900 hover:bg-white mt-4 lg:mt-0"
                      >
                        Group
                      </Link>
                    </div>

                    {token.role === "admin" ?
                      <div className="ml-4">
                        <Link
                          to="/admin"
                          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-900 hover:bg-white mt-4 lg:mt-0"
                        >
                          Add User
                        </Link>
                      </div>
                      :
                      <div>
                      </div>
                    }
                    <div className="ml-4">
                      <Link
                        to="/main"
                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-900 hover:bg-white mt-4 lg:mt-0"
                      >
                        Main
                      </Link>
                    </div>

                    <div className="ml-4">
                      <Link
                        to="/profile"
                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-900 hover:bg-white mt-4 lg:mt-0"
                      >
                        Profile
                      </Link>
                    </div>

                    <div className="ml-4">
                      <button onClick={() => { logout(token._id) }}

                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-900 hover:bg-white mt-4 lg:mt-0"
                      >
                        Log Out
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </nav>



            <Routes>
              <Route path="/" element={<Login setToken={setToken} />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/profile" element={token ? <Profile token={token} /> : <Login setToken={setToken} />} />
              <Route path="/main" element={token ? <Main token={token} /> : <Login setToken={setToken} />} />
              <Route path="/admin" element={token.role === "admin" ? <Admin token={token} /> : <Profile token={token} />} />
              <Route path="/group" element={token ? <Group token={token} /> : <Login setToken={setToken} />} />
              {/* <Route path="/admin" element={<Admin token={token} />} /> */}
            </Routes>
          </Router>

        :
        <Router>
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/profile" element={token ? <Profile token={token} /> : <Login setToken={setToken} />} />
            <Route path="/main" element={token ? <Main token={token} /> : <Login setToken={setToken} />} />
            <Route path="/group" element={token ? <Group token={token} /> : <Login setToken={setToken} />} />

          </Routes>
        </Router>
      }
    </div>

  );
}

export default App;
