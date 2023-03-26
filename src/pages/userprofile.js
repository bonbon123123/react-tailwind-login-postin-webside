import React, { useState, useEffect } from "react";
import './App.css';

import Post from '../components/Post';
import PostArea from '../components/PostArea';
import PasswordChange from '../components/passwordChane';





export function UserProfile(props) {
    const { token } = props;
    const [posts, setPosts] = useState([]);
    const [currentTop, setTop] = useState("");
    const [profilePicture, setIProfilePicture] = useState(null);
    
    function handleButtons(topState) {

        setTop(topState);

    }

    useEffect(() => {
        fetch('http://localhost:3001/getMyPosts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                created_by: token._id
            })
        })
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                // console.log("data of posts: ", data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function topComponent() {
        switch (currentTop) {
            case 'post':
                return <PostArea user={token._id} handleButtons={handleButtons} />
            case 'password':
                return <PasswordChange token={token} handleButtons={handleButtons} />
            case 'edit':
                return <PasswordChange />
        }

    }


    const postComponents =
        posts.length > 0 ? (

            posts.map((post, index) => {
                return <Post key={index} content={post} />;
            })
        ) : (
            <p>Loading posts...</p>
        );




    useEffect(() => {

        fetch('http://localhost:3001/profilePicture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: token.image })
        })
            .then(response => response.blob())
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob);
                setIProfilePicture(imageUrl);
            });
    }, [token._id]);
    // {
    //     profilePicture && (
    //         <img src={profilePicture} alt="Post image" fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    //     )
    // }
    //{/* <p >{!data ? "Loading..." : data[0]._id}</p> */ }
    //{ token.first_name }
    //{ <div>{postComponents}</div> }
    return (
        <div className="flex flex-row h-screen bg-gray-800">
            {/* Left column */}

            <div className="flex flex-col w-1/4 h-full p-10 bg-gray-900">
                <div className="flex justify-center">
                    <img
                        className="w-48 h-48 object-cover rounded-full border-4 border-gray-300"
                        src={profilePicture}
                        alt="Profile picture"
                    />
                </div>

                <div className="flex flex-row mt-10 justify-around">
                    <button
                        onClick={() => handleButtons('edit')}
                        type="submit"
                        className="mb-2 bg-blue-500 text-white px-1 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">

                        Edit Profile
                    </button>
                    <button
                        type="submit"
                        onClick={() => handleButtons('password')}
                        className="mb-2 bg-blue-500 text-white px-1 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                        Change password
                    </button>

                </div>
                <div className="flex flex-row mt-1 justify-around">
                    <button
                        type="submit"
                        onClick={() => handleButtons('post')}
                        className="mb-2 bg-blue-500 text-white px-1 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                        Make Post
                    </button>
                </div>
                <div className="flex flex-col justify-center mt-10">
                    <h2 className="text-2xl font-medium text-white">{token.first_name} {token.last_name}</h2>
                    <p className="text-gray-400 mt-2">Departament: {token.department}</p>
                    <p className="text-gray-400 mt-2">Role: {token.role}</p>

                    <div className="flex flex-col justify-center mt-10">
                        <h2 className="text-3xl font-medium text-white">About Me</h2>
                        <p className="text-gray-400 mt-2">
                            {token.bio}
                        </p>
                    </div>

                </div>

            </div>
            {/* Right column */}

            <div className="flex flex-col w-3/4 h-full p-10 bg-gray-800 overflow-y-scroll" >
                <div >
                    {topComponent()}

                </div>
                {<div >{postComponents}</div>}
            </div>
        </div>




    )
}

export default UserProfile;