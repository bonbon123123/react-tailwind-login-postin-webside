import React, { useState } from "react";
import './App.css';
import Post from '../components/Post';
import PostArea from '../components/PostArea';
export function UserProfile(props) {
    const { token } = props;
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    console.log(token.role);

    React.useEffect(() => {
        if (token.role === "admin") {
            fetch('http://localhost:3001/getPosts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setPosts(data);
                })
                .catch(error => {
                    console.error(error);
                })

        } else {
            fetch('http://localhost:3001/getPostsWithMyPremission', {
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
                    setPosts(data);
                })
                .catch(error => {
                    console.error(error);
                })
        };
        fetch('http://localhost:3001/getUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error(error);
            })

    }, []);

    const postComponents =
        posts.length > 0 ? (

            posts.map((post, index) => {
                return <Post key={index} content={post} />;
            })
        ) : (
            <p>Loading posts...</p>
        );
    const userComponents =
        users.length > 0 ? (

            users.map((post, index) => {
                return <Post key={index} content={post} />;
            })
        ) : (
            <p>Loading posts...</p>
        );


    return (
        <div className="flex flex-row h-screen bg-gray-800 ">
            <div className="flex flex-col w-1/4 h-full p-10 bg-gray-900 overflow-y-scroll">
                <div className="flex justify-center">

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
                    <PostArea user={token._id} />
                </div>
                {<div >{postComponents}</div>}
            </div>
        </div>




    )
}

export default UserProfile;