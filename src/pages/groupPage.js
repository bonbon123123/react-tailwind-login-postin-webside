import React, { useState } from "react";
import './App.css';
import GroupEdit from '../components/groupEdit'
import MakeGroup from '../components/MakeGroup'
import UserBar from '../components/UserBar'
import EditUSer from '../components/editUser'
export function Group(props) {
    const { token } = props;
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [usersReady, setReady] = useState([]);
    const [groupNames, setGroupNames] = useState([]);
    const [groupEdited, setEditedGroup] = useState(null);
    const [currentTop, setTop] = useState("add");
    const [userToEdit, setUserToEdit] = useState(null);

    function editUserHandler(user, groupName) {
        setTop("user")

        let updateTab = usersReady
        // make a copy of the current groupUsers state
        updateTab[groupName].push(user)
        // // add the new user to the groupUsers array
        setReady(updateTab);

        // send a request to the server to add the user to the group
        fetch('http://localhost:3001/addUserToGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user._id,
                group: groupName,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // do something with the response data, if needed
            })
            .catch((error) => {
                console.error(error);
            });
    }


    function topComponent() {
        switch (currentTop) {
            case 'group':
                return <GroupEdit token={token} group={groupEdited} users={users} onAddUser={editUserHandler} />
            case 'add':
                return <MakeGroup token={token} />
            case 'user':
                return <EditUSer user={token} />
        }

    }


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
    React.useEffect(() => {
        const groupedUsers = {};

        groups.forEach((group) => {
            if (!groupNames.includes(group.name)) {
                setGroupNames((prevGroupNames) => [...prevGroupNames, group.name]);
            }
            group.members.forEach((user) => {
                if (groupedUsers[group.name]) {
                    users.forEach(miniuser => {

                        if (miniuser._id == user) {
                            groupedUsers[group.name].push(miniuser);
                        }
                    })

                } else {
                    users.forEach(miniuser => {

                        if (miniuser._id == user) {
                            groupedUsers[group.name] = [miniuser];
                        }
                    })

                }
            });
        });

        setReady(groupedUsers);
    }, [groups]);


    function choseEdit(groupToEdit) {
        setTop("group")
        groups.forEach(group => {
            if (group.name == groupToEdit)
                setEditedGroup(group);
        });


    }

    const userBars = groups.length > 0 ? (
        groupNames.map((groupName, index) => { // iterate over group names instead of users
            const group = usersReady[groupName]; // get the group object from the users state using the group name as key

            return (
                <div className="w-full" key={index}>
                    <div className="flex flex-row">
                        <div className="rounded-full bg-blue-400 block mb-1 font-bold text-white py-2 px-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flex: 1 }}>
                            {groupName} {/* display the group name */}
                        </div>

                        <button className="rounded-full bg-blue-500 text-white font-bold py-2 px-4 mb-1" onClick={() => choseEdit(groupName)}>EDIT</button>

                    </div >
                    <UserBar content={group} />
                </div>
            );
        })
    ) : (
        <p>Loading posts...</p>
    );




    return (
        <div className="flex flex-col h-screen bg-gray-800 ">
            <div>

                {topComponent()}
            </div>
            <div className="flex flex-row h-screen bg-gray-800 ">
                {userBars}
            </div>

        </div>

    )
}

export default Group;