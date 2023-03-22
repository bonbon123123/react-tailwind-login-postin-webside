import React, { useState } from "react";
import './App.css';
import Post from '../components/Post';
import PostArea from '../components/PostArea';
export function UserProfile(props) {
    const { token } = props;
    const [posts, setPosts] = useState([]);
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
    }, []);

    const postComponents =
        posts.length > 0 ? (

            posts.map((post, index) => {
                return <Post key={index} content={post} />;
            })
        ) : (
            <p>Loading posts...</p>
        );


    // {
    //     profilePicture && (
    //         <img src={profilePicture} alt="Post image" fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    //     )
    // }
    //{/* <p >{!data ? "Loading..." : data[0]._id}</p> */ }
    //{ token.first_name }
    //{ <div>{postComponents}</div> }
    return (
        <div className=" bg-gray-800">

            {/* Right column */}

            <div className="flex flex-col w-4/4 h-full p-10 bg-gray-800 " >
                <div >
                    <PostArea user={token._id} />
                </div>
                {<div >{postComponents}</div>}
            </div>
        </div>




    )
}

export default UserProfile;