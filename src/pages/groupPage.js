import React, { useState } from "react";
import './App.css';
import Post from '../components/Post';
import PostArea from '../components/PostArea';
import User from '../components/User'
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
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

            users.map((users, index) => {
                return <User key={index} content={users} />;
            })
        ) : (
            <p>Loading Users...</p>
        );


    return (
        <div className="flex flex-row h-screen bg-gray-800 ">
            <div className="flex flex-col w-1/4 h-full p-1 bg-gray-900 rounded-lg overflow-y-scroll">
                {userComponents}

                {/* other sidebar components */}



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