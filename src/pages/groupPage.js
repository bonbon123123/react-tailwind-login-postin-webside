import React, { useState } from "react";
import './App.css';
import Post from '../components/Post';
import PostArea from '../components/PostArea';
import User from '../components/User'
import MakeGroup from '../components/MakeGroup'
import UserBar from '../components/UserBar'

export function Group(props) {
    const { token } = props;
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [usersReady, setReady] = useState([]);
    const [groupNames, setGroupNames] = useState([]);

    React.useEffect(() => {
        fetch('http://localhost:3001/getGroups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                role: token.role
            })
        })
            .then(response => response.json())
            .then(data => {
                setGroups(data);
            })
            .catch(error => {
                console.error(error);
            })
        fetch('http://localhost:3001/getUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                role: token.role
            })
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);
    React.useEffect(() => {
        const groupedUsers = {};

        groups.forEach((group) => {
            if (!groupNames.includes(group.name)) {
                setGroupNames((prevGroupNames) => [...prevGroupNames, group.name]);
            }
            group.members.forEach((user) => {
                if (groupedUsers[group.name]) {
                    users.forEach(miniuser => {

                        if (miniuser._id == user) {
                            groupedUsers[group.name].push(miniuser);
                        }
                    })

                } else {
                    users.forEach(miniuser => {

                        if (miniuser._id == user) {
                            groupedUsers[group.name] = [miniuser];
                        }
                    })

                }
            });
        });

        setReady(groupedUsers);
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    }, [groups]);

    const userBars = groups.length > 0 ? (
        groupNames.map((groupName, index) => { // iterate over group names instead of users
            const group = usersReady[groupName]; // get the group object from the users state using the group name as key

            return (
                <div className="w-full" key={index}>
                    <div htmlFor="name" className="block mb-1 font-bold text-white">
                        {groupName} {/* display the group name */}
                    </div>
                    <UserBar content={group} />
                </div>
            );
        })
    ) : (
        <p>Loading posts...</p>
    );




    return (
        <div className="flex flex-col h-screen bg-gray-800 ">
            <div>
                <MakeGroup token={token} />
            </div>
            <div className="flex flex-row h-screen bg-gray-800 ">
                {userBars}
            </div>

        </div>

    )
}

export default Group;