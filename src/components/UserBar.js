import React, { useState, useEffect } from 'react';
import './App.css';
import User from './User'
export default function UserBar(props) {
    const { content } = props;
    const [users, setUsers] = useState([]);

    React.useEffect(() => {

        fetch('http://localhost:3001/getUsersFromGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: content._id
            })
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error(error);
            })
        console.log(users)
    }, []);

    const userComponents =
        users.length > 0 ? (
            users.map((user, index) => {

                return <User key={index} content={user[0]} />;
            })
        ) : (
            <p>Loading Users...</p>
        );



    return (
        // <div className="flex items-center justify-center h-screen">
        //     <div className="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
        //         <p>{content.text}</p>
        //         {imageUrl && (
        //             <img src={imageUrl} alt="Post image" />
        //         )}
        //     </div>
        // </div>
        <div className="flex flex-col w-full h-full p-1 bg-gray-900 rounded-lg overflow-y-scroll">
            {userComponents}
        </div>


    );
}
