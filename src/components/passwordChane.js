import { useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';



export default function PasswordChange(props) {
    const { token } = props;
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordOne, setFirstPassword] = useState("");
    const [passwordTwo, setSecondPassword] = useState("");

    const handleLoginChange = (event) => {

        setLogin(event.target.value);

    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleFirstPassword = (event) => {
        setFirstPassword(event.target.value);
    };
    const handleSecondPassword = (event) => {
        setSecondPassword(event.target.value);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();



        if (token.login == login && token.password == password && passwordOne == passwordTwo && passwordOne != "") {
            const formData = new FormData();
            let jsonData = {
                login: login,
                password: password,
                passwordOne: passwordOne,
                status: "online",
            }
            formData.append('jsonData', JSON.stringify(jsonData));

            const URL = "http://localhost:3001/changePassword"
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const result = await axios.post(URL, formData, config)

            sessionStorage.clear();
            window.location.href = '/';
        } else {
            alert("wrong input")
        }

    };

    return (
        <div class="text-white mx-auto max-w-7xl py-12 sm:px-2 sm:py-12 lg:px-2">
            <div class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24  lg:gap-x-20 lg:px-24 lg:pt-0 grid grid-cols-1 gap-4">
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <div className="my-2">
                        <label htmlFor="login" className="block mb-1 font-bold">
                            Login
                        </label>
                        <input
                            type="text"
                            name="login"
                            value={login}
                            onChange={handleLoginChange}
                            className="w-full p-2 border border-gray-400 rounded text-black"
                        />
                    </div>
                    <div className="my-2">
                        <label htmlFor="password" className="block mb-1 font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full p-2 border border-gray-400 rounded text-black"
                        />
                    </div>
                    <div className="my-2">
                        <label htmlFor="passwordOne" className="block mb-1 font-bold">
                            New password
                        </label>
                        <input
                            type="password"
                            name="passwordOne"
                            value={passwordOne}
                            onChange={handleFirstPassword}
                            className="w-full p-2 border border-gray-400 rounded text-black"
                        />
                    </div>
                    <div className="my-2">
                        <label htmlFor="passwordTwo" className="block mb-1 font-bold">
                            Repeat Password
                        </label>
                        <input
                            type="password"
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={handleSecondPassword}
                            className="w-full p-2 border border-gray-400 rounded text-black"
                        />
                    </div>

                    <div className="my-2">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


