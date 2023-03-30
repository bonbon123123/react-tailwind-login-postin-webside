import React, { useState, useEffect } from 'react';
import './App.css';

export default function User(props) {
    const { content } = props;
    const [imageUrl, setIProfilePicture] = useState(null);

    // console.log(content[0]);
    // console.log(content[0].image);
    useEffect(() => {
        async function fetchProfilePicture() {
            try {
                const response = await fetch('http://localhost:3001/profilePicture', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image: content.image })
                });
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setIProfilePicture(imageUrl);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProfilePicture();
    }, [content._id]);



    return (


        <div className={content.status == "not_activated" ?
            "overflow-x-scroll flex items-center bg-red-800 space-x-4 mb-8 shadow-2xl sm:rounded-2xl  w-full h-full"
            :
            "overflow-x-scroll flex items-center bg-gray-800 space-x-4 mb-8 shadow-2xl sm:rounded-2xl  w-full h-full"}>
            {imageUrl && (
                <img src={imageUrl} alt="Profile Picture" className="ml-2 w-12 h-12 rounded-full" />
            )}
            <div className="text-white">
                <p className="text-lg font-bold">{content.first_name}</p>
                <p className="text-gray-400">{content.last_name}</p>
            </div>
            <div className="text-white">
                <p className="text-lg font-bold">{content.department}</p>
                <p className="text-gray-400">{content.role}</p>
            </div>
            <div className="text-white">
                <p className="text-lg font-bold">{content.login}</p>
                <p className="text-gray-400">{content.status}</p>
            </div>

        </div>




    );
}
