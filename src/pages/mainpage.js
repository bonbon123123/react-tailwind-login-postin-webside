import React, { useState } from "react";
import './App.css';
import Post from '../components/Post';
import PostArea from '../components/PostArea';

export function UserProfile(props) {
    const { token } = props;
    const [posts, setPosts] = useState([]);

    const [groups, setGroups] = useState([]);
    const [myGroups, setMyGroups] = useState([]);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState([]);
    //console.log(token.role);

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



    }, []);

    React.useEffect(() => {
        groups.forEach((group) => {
            group.members.forEach(userInGRoup => {

                if (userInGRoup == token._id) {

                    // console.log(token._id);
                    // console.log(userInGRoup);
                    if (!myGroups.some(myGroup => myGroup._id === group._id)) {
                        setMyGroups((prevGroups) => [...prevGroups, group]);
                        setCurrentGroup(group);
                    }
                    //setMyGroups(prevGroupNames => [...prevGroupNames, group.name]);
                }

            });

        })

        //console.log(myGroups)

    }, [groups]);

    React.useEffect(() => {
        // filter posts based on current group
        if (currentGroup) {
            setFilteredPosts(posts.filter(post => post.permission === currentGroup));
        } else {
            setFilteredPosts(posts);
        }
    }, [currentGroup]);

    const buttonComponents =
        groups.length > 0 ? (
            <div className="flex flex-col gap-4">
                {token.role === "admin" ?
                    groups.map((group, index) => {

                        return (
                            <button
                                key={index}
                                onClick={() => setCurrentGroup(group.name)}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                            >
                                {group.name}
                            </button>
                        );
                    })
                    :
                    myGroups.map((group, index) => {

                        return (
                            <button
                                key={index}
                                onClick={() => setCurrentGroup(group.name)}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                            >
                                {group.name}
                            </button>
                        );
                    })}
            </div>
        ) : (
            <p>Loading buttons...</p>
        );

    //console.log(currentGroup);
    const postComponents =
        filteredPosts.length > 0 ? (

            filteredPosts.map((post, index) => {

                return <Post key={index} content={post} />;

            })
        ) : (
            <p>Loading posts...</p>
        );



    return (
        <div className="flex flex-row h-screen bg-gray-800 ">
            <div className="flex flex-col w-1/4 h-full p-1 bg-gray-900 rounded-lg overflow-y-scroll">
                {buttonComponents}

                {/* other sidebar components */}



            </div>


            <div className="flex flex-col w-3/4 h-full p-10 bg-gray-800 overflow-y-scroll" >

                <div >
                    <PostArea user={token._id} />
                </div>
                {/* {buttonComponents} */}
                {<div >{postComponents}</div>}
            </div>
        </div>




    )
}

export default UserProfile;