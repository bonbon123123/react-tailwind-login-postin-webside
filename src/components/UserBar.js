import React, { useState, useEffect } from 'react';
import './App.css';
import User from './User'
export default function UserBar(props) {
    const { content } = props;
    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await fetch('http://localhost:3001/getUsersFromGroup', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Access-Control-Allow-Origin': '*'
    //                 },
    //                 body: JSON.stringify({
    //                     id: content._id
    //                 })
    //             });
    //             const data = await response.json();
    //             setUsers(data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     fetchData();
    // }, [content._id]);


    const userComponents =
        content && content.length > 0 ? (
            content.map((user, index) => {
                return <User key={index} content={user} />;
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
