import React, { useState } from "react";
import './App.css';
import PropTypes from 'prop-types';


async function loginUser(raw) {
    return fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: raw
    })
        .then(data => data.json())
}

export default function LoginPage({ setToken }) {

    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    // React.useEffect(() => {
    //     fetch("/getUsers")
    //         .then((res) => res.json())
    //         .then((data) => setData(data));
    // }, []);



    const handleLogin = async e => {
        e.preventDefault();
        var raw = JSON.stringify({
            "login": login,
            "password": password
        });

        const token = await loginUser(raw);
        //console.log(token)
        setToken(token[0]);
        window.location.href = "/profile";
        //console.log(token[0]._id);

    }


    return (
        <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div class="max-w-md mx-auto">
                        <div>
                            <h1 class="text-2xl font-semibold">Login Form with Floating Labels</h1>
                        </div>
                        <div class="divide-y divide-gray-200">
                            <form onSubmit={handleLogin}
                                class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div class="relative">
                                    <input
                                        placeholder="Password"
                                        autoComplete="off"
                                        id="login"
                                        name="login"
                                        type="text"
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}
                                        class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                    />
                                    <label for="login" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Login</label>

                                </div>
                                <div class="relative">
                                    <input
                                        placeholder="Password"
                                        autoComplete="off"
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
                                    <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                </div>
                                <div class="relative">
                                    <button
                                        type="submit"
                                        class="bg-blue-500 text-white rounded-md px-2 py-1">Submit
                                    </button>
                                </div>
                            </form >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}