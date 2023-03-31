import React, { useState, useEffect } from 'react';
import './App.css';
import User from './User'
import axios from 'axios';

export default function GroupEdit(props) {
    const { token, group, users } = props;

    const [groupUsers, setGroupUsers] = useState([]);
    const [notGroupUsers, setNotGroupUsers] = useState([]);
    const [imageUrl, setIProfilePicture] = useState(null);
    const [currentSidebar, setCurrentSidebar] = useState("remove");



    useEffect(() => {
        async function fetchProfilePicture() {
            try {
                const response = await fetch('http://localhost:3001/groupPicture', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image: group.image })
                });
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setIProfilePicture(imageUrl);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProfilePicture();
    }, [group.image]);

    const addUserToGroup = (myUser) => {
        // call the onAddUser prop to add the user to the group
        props.onAddUser(myUser);
    }
    const removeUserFromGroup = (myUser) => {
        fetch('http://localhost:3001/removeUserFromGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: myUser._id,
                group: group.name
            })

        })
            .then(response => response.json())
            .then(data => {
                //setGroups(data);
            })
            .catch(error => {
                console.error(error);
            })
    }
    // console.log(users)
    console.log(group)
    // console.log(token)

    const notPartOfGroupUserComponents =
        groupUsers && groupUsers.length > 0 ? (
            groupUsers.map((user, index) => {
                //console.log(user)
                return (
                    <div key={index} className="flex flex-row gap-4">
                        <button className="rounded-full bg-blue-500 text-white font-bold  px-2 " onClick={() => { removeUserFromGroup(user) }}>REMOVE</button>
                        <User content={user} />
                    </div>
                );
            })
        ) : (
            <p>Loading Users...</p>
        );
    const partOfGroupUserComponents =
        notGroupUsers && notGroupUsers.length > 0 ? (
            notGroupUsers.map((user, index) => {
                //console.log(user)
                return (
                    <div key={index} className="flex flex-row gap-4">
                        <button className="rounded-full bg-blue-500 text-white font-bold  px-2 " onClick={() => { addUserToGroup(user) }}>ADD</button>
                        <User content={user} />
                    </div>
                );
            })
        ) : (
            <p>Loading Users...</p>
        );
    function sideComponent() {
        switch (currentSidebar) {
            case 'add':
                return notPartOfGroupUserComponents
            case 'remove':
                return partOfGroupUserComponents
        }

    }
    React.useEffect(() => {

        if (group !== null) {

            let setGroupUserstab = [];

            let notMyUsers = users.filter((user) => {
                if (group.members.findIndex((member) => {
                    if (user._id == member) {
                        return true;

                    } else {
                        return false;

                    }

                }) != -1) {
                    setGroupUserstab.push(user)
                    return false
                } else {
                    return true
                }
            })
            console.log(notMyUsers);

            setGroupUsers(setGroupUserstab);
            setNotGroupUsers(notMyUsers);
        }

        // setReady(groupedUsers);
    }, [group]);



    return (

        <div className="flex flex-row w-full h-full p-1 bg-gray-900 rounded-lg overflow-y-scroll">
            <div className="flex flex-col w-1/3 h-full p-10 bg-gray-900">
                <h2 className="text-3xl flex justify-center font-medium text-white">{group.name}</h2>
                <div className="flex justify-center">
                    <img
                        className="w-48 h-48 object-cover rounded-full border-4 border-gray-300"
                        src={imageUrl}
                        alt="Profile picture"
                    />
                </div>

                <div className="flex flex-start mt-4 justify-around">
                    <button
                        // onClick={() => handleButtons('edit')}
                        type="submit"
                        className="mb-2 bg-blue-500 text-white px-1 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300">

                        Add User
                    </button>
                    <button
                        type="submit"
                        // onClick={() => handleButtons('password')}
                        className="mb-2 bg-blue-500 text-white px-1 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300">
                        Remove User
                    </button>

                </div>
                <div className="flex flex-start mt-4 justify-around">
                    <button
                        // onClick={() => handleButtons('edit')}
                        type="submit"
                        className="mb-2 bg-blue-500 text-white px-1 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300">

                        Edit Group
                    </button>
                    <button
                        type="submit"
                        // onClick={() => handleButtons('password')}
                        className="mb-2 bg-blue-500 text-white px-1 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300">
                        Quit Changes
                    </button>

                </div>
                <div className="flex flex-col justify-center mt-4">
                    <div className="flex flex-col justify-center mt-4">
                        <h2 className="text-3xl font-medium text-white">Description</h2>
                        <p className="text-gray-400 mt-2">
                            {group.description}
                        </p>
                    </div>

                </div>
            </div>
            <div className="flex flex-col w-2/3 h-full">
                {sideComponent()}
            </div>

        </div>


    );
}
