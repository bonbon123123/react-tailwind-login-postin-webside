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

    }, []);

    React.useEffect(() => {
        groups.forEach(element => {
            if (!groupNames.includes(element.name)) {
                setGroupNames(prevGroupNames => [...prevGroupNames, element.name]);
            }
        });
    }, [groups]);



    const userBars = groups.length > 0 ? (
        groups.map((group, index) => {
            return (
                <div className="w-full" key={index}>
                    <div htmlFor="name" className="block mb-1 font-bold text-white">
                        {group.name}
                    </div>
                    <UserBar content={group} />
                </div>
            );
        })
    ) : (
        <p>Loading posts...</p>
    );

    // const postComponents =
    //     posts.length > 0 ? (

    //         posts.map((post, index) => {
    //             return <Post key={index} content={post} />;
    //         })
    //     ) : (
    //         <p>Loading posts...</p>
    //     );
    // const userComponents =
    //     users.length > 0 ? (

    //         users.map((users, index) => {
    //             return <User key={index} content={users} />;
    //         })
    //     ) : (
    //         <p>Loading Users...</p>
    //     );


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