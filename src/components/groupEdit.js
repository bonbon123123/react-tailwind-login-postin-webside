import React, { useState, useEffect } from 'react';
import './App.css';
import User from './User'
import axios from 'axios';

export default function GroupEdit(props) {
    const { token, group, users } = props;

    const [groupUsers, setGroupUsers] = useState([]);
    const [notGroupUsers, setNotGroupUsers] = useState([]);

    const addUserToGroup = (myUser) => {

        fetch('http://localhost:3001/addUserToGroup', {
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

    // console.log(token)
    const notPartOfGroupUserComponents =
        groupUsers && groupUsers.length > 0 ? (
            groupUsers.map((user, index) => {
                //console.log(user)
                return (
                    <div className="flex flex-row gap-4">
                        <button className="rounded-full bg-blue-500 text-white font-bold  px-2 " onClick={() => { removeUserFromGroup(user) }}>REMOVE</button>
                        <User key={index} content={user} />
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
                    <div className="flex flex-row gap-4">
                        <button className="rounded-full bg-blue-500 text-white font-bold  px-2 " onClick={() => { addUserToGroup(user) }}>ADD</button>
                        <User key={index} content={user} />
                    </div>
                );
            })
        ) : (
            <p>Loading Users...</p>
        );

    React.useEffect(() => {

        if (group !== null) {

            let setGroupUserstab = [];
            let setNotGroupUserstab = []

            // users.forEach((user) => {
            //     // console.log(user._id)
            //     // console.log(group.members)
            //     group.members.forEach(member => {
            //         console.log(user._id, member)
            //         if (user._id == member) {
            //             console.log(1)
            //             if (!groupUsers.some(usr => usr._id === group._id)) {
            //                 console.log("GroupUsers", user.login);
            //                 setGroupUserstab.push(user)

            //             }

            //         } else {
            //             console.log(2)
            //             if (!notGroupUsers.some(notUsr => notUsr._id === group._id)) {
            //                 console.log("notGroupUsers", user.login);
            //                 setNotGroupUserstab.push(user)

            //             }
            //         }
            //         //console.log("members", member)
            //     });
            //     // if (!groupEdited.members.includes(user._id)) {
            //     //     setGrouUsers((prevGroupNames) => [...prevGroupNames, user]);
            //     // }

            // });
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
            <div className="flex flex-col w-1/3 h-full">
                {notPartOfGroupUserComponents}
            </div>
            <div className="flex flex-col w-1/3 h-full">
                {partOfGroupUserComponents}
            </div>
        </div>


    );
}
