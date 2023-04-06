import React, { useState, useEffect } from "react";
import './App.css';
import User from '../components/User';
import EditUSer from "../components/editUser";


export default function Users(props) {
    const { token } = props;
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState(null);
    const [currentTop, setCurrentTop] = useState("filter");
    const [currentEditedUser, setCurrentEditedUser] = useState(null);
    //console.log(token.role);
    function handleButtons(topState) {

        setFilter(topState);

    }

    function topComponent() {
        switch (currentTop) {
            case 'filter':
                return (<div className=" h-3/4">
                    <button className="rounded-full w-full h-1/4 bg-blue-500 text-white font-bold  px-2 " onClick={() => { handleButtons("name") }}>Name</button>
                    <button className="rounded-full w-full h-1/4 bg-blue-500 text-white font-bold  px-2 " onClick={() => { handleButtons("departament") }}>Departament</button>
                    <button className="rounded-full w-full h-1/4 bg-blue-500 text-white font-bold  px-2 " onClick={() => { handleButtons("status") }}>status</button>

                </div>)
            case 'editUser':
                return (
                    <div className=" h-full">
                        <button className=" m-0 bg-blue-500 text-white py-2 px-4 rounded" onClick={() => { stopEditingUser() }}>stop editing</button>

                        <EditUSer user={currentEditedUser}
                        />

                    </div>)
        }

    }
    function startEditingUser(userToEdit) {
        console.log(userToEdit)
        setCurrentTop("editUser")
        setCurrentEditedUser(userToEdit)
    }
    function stopEditingUser() {
        setCurrentTop("filter")
    }
    useEffect(() => {
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


    useEffect(() => {
        let sortedUsers = [...users];
        switch (filter) {
            case "name":
                sortedUsers.sort((a, b) => a.first_name.localeCompare(b.name));
                break;
            case "department":
                sortedUsers.sort((a, b) => a.department.localeCompare(b.department));
                break;
            case "status":
                sortedUsers.sort((a, b) => a.status.localeCompare(b.status)).reverse();
                break;
            default:
                break;
        }
        setFilteredUsers(sortedUsers);


    }, [filter, users]);
    const userGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "2rem",
    };

    const filteredUsersComponent =
        filteredUsers && filteredUsers.length > 0 ? (
            <div style={userGridStyle}>
                {filteredUsers.map((user, index) => {
                    return (
                        <div key={index}>
                            {token.role === "admin" && (
                                <button
                                    className="rounded-full bg-blue-500 text-white font-bold px-2"
                                    onClick={() => {
                                        startEditingUser(user);
                                    }}
                                >
                                    EDIT
                                </button>
                            )}
                            <User content={user} />
                        </div>
                    );
                })}
            </div>
        ) : (
            <p>Loading Users...</p>
        );

    //console.log(currentGroup);

    return (
        <div className="flex flex-col h-screen bg-gray-800 ">
            <div className="flex flex-col w-full h-full p-1 bg-gray-900 rounded-lg overflow-y-scroll">
                {topComponent()}

                {/* other sidebar components */}



            </div>


            <div className="flex  justify-around  w-full h-full p-10 bg-gray-800 overflow-y-scroll" >


                {<div >{filteredUsersComponent}</div>}
            </div>
        </div>




    )
}
