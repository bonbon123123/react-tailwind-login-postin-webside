
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


export default function AdminPage(props) {
    const { token } = props;
    const [image, setImage] = useState(null);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLasttName] = useState("");
    const [bio, setBio] = useState();
    const [department, setDepartament] = useState("");
    const [role, setRole] = useState("");
    const [group, setGroup] = useState("");
    const [groups, setGroups] = useState([]);
    const [groupNames, setGroupNames] = useState([]);

    const handleImageChange = (event) => {
        const newImage = event.target.files[0];
        setImage(newImage);
    };
    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLasttName(event.target.value);
    };
    const handleBioChange = (event) => {
        setBio(event.target.value);
    };
    const handleDepartamentChange = (event) => {
        setDepartament(event.target.value);
    };
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const handleGroupChange = (event) => {
        setGroup(event.target.value);
    };


    React.useEffect(() => {
        fetch('http://localhost:3001/getGroups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setGroups(data);
            })
            .catch(error => {
                console.error(error);
            })

    }, []);

    React.useEffect(() => {

        groups.forEach(element => {
            if (!groupNames.includes(element.name)) {
                setGroupNames(prevGroupNames => [...prevGroupNames, element.name]);
            }
        });
        setGroup(groupNames[0])
    }, [groups]);




    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        let jsonData = {
            login: login,
            password: password,
            first_name: first_name,
            last_name: last_name,
            bio: bio,
            role: role,
            group: group,
            created_at: Date.now(),
            created_by: token.id,
            first_login: "",
            department: department,
            status: "offline",
        }
        formData.append('jsonData', JSON.stringify(jsonData));
        if (image) {
            formData.append('image', image);
        }

        const URL = "http://localhost:3001/addUser"
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        const result = await axios.post(URL, formData, config)
        console.log(formData);
        console.log("REsult: ", result);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="my-2">
                <label htmlFor="login" className="block mb-1 font-bold">
                    Login
                </label>
                <input
                    type="login"
                    name="login"
                    value={login}
                    onChange={handleLoginChange}
                    className="w-full p-2 border border-gray-400 rounded"
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
                    className="w-full p-2 border border-gray-400 rounded"
                />
            </div>
            <div className="my-2">
                <label htmlFor="first_name" className="block mb-1 font-bold">
                    First Name
                </label>
                <input
                    type="text"
                    name="first_name"
                    value={first_name}
                    onChange={handleFirstNameChange}
                    className="w-full p-2 border border-gray-400 rounded"
                />
            </div>
            <div className="my-2">
                <label htmlFor="last_name" className="block mb-1 font-bold">
                    Last Name
                </label>
                <input
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={handleLastNameChange}
                    className="w-full p-2 border border-gray-400 rounded"
                />
            </div>
            <div className="my-2">
                <label htmlFor="bio" className="block mb-1 font-bold">
                    Bio
                </label>
                <textarea
                    name="bio"
                    value={bio}
                    onChange={handleBioChange}
                    className="w-full p-2 border border-gray-400 rounded"
                />
            </div>
            <div className="my-2">
                <label htmlFor="role" className="block mb-1 font-bold">
                    Role
                </label>
                <select
                    name="role"
                    value={role}
                    onChange={handleRoleChange}
                    className="w-full p-2 border border-gray-400 rounded"
                >
                    <option value="">Select a role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className="my-2">
                <label htmlFor="group" className="block mb-1 font-bold">
                    Group
                </label>
                <select
                    name="group"
                    value={group}
                    onChange={handleGroupChange}
                    className="w-full p-2 border border-gray-400 rounded"
                >
                    {groupNames.map((groupName, index) => (
                        <option key={index} value={groupName}>
                            {groupName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="my-2">
                <label htmlFor="department" className="block mb-1 font-bold">
                    Departament
                </label>
                <select
                    name="department"
                    value={department}
                    onChange={handleDepartamentChange}
                    className="w-full p-2 border border-gray-400 rounded"
                >
                    <option value="testers">Select a department</option>
                    <option value="administration">administration</option>
                    <option value="testers">testers</option>
                </select>
            </div>

            <div className="mb-5">
                <label htmlFor="image" className="block font-medium mb-1 text-gray-300">
                    Image
                </label>
                <div className="flex flex-wrap">
                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={image.name}
                            className="w-16 h-16 object-cover border-2 border-gray-200 rounded-md mr-2 mb-2"
                        />
                    )}
                </div>
                <div className="relative border-2 border-gray-200 rounded-md p-4 flex justify-center items-center">
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="text-gray-400 w-6 h-6" />
                    <p className="ml-2 text-gray-400">Drag and drop or click to upload</p>
                </div>
            </div>

            <div className="my-2">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Add User
                </button>
            </div>
        </form>

    )
}


