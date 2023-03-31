
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


export default function EditUSer(props) {
    const { user } = props;
    const [image, setImage] = useState(null);
    const [bio, setBio] = useState(user.bio);
    const [department, setDepartament] = useState(user.department);
    const [id] = useState(user._id);

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
                    body: JSON.stringify({ image: user.image })
                });
                const blob = await response.blob();
                // const imageUrl = URL.createObjectURL(blob);
                setImage(blob);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProfilePicture();
    }, [user]);

    const handleImageChange = (event) => {
        const newImage = event.target.files[0];
        setImage(newImage);
    };


    const handleBioChange = (event) => {
        setBio(event.target.value);
    };
    const handleDepartamentChange = (event) => {
        setDepartament(event.target.value);
    };






    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(id);


        const formData = new FormData();
        let jsonData = {
            id: id,
            bio: bio,
            department: department,
        }
        formData.append('jsonData', JSON.stringify(jsonData));
        if (image) {
            formData.append('image', image);
        }

        const URL = "http://localhost:3001/editUser"
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        const result = await axios.post(URL, formData, config)
        // console.log(formData);
        console.log("REsult: ", result);

    };

    return (
        <div class="text-white mx-auto max-w-7xl py-12 sm:px-2 sm:py-12 lg:px-2">
            <div class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24  lg:gap-x-20 lg:px-24 lg:pt-0 grid grid-cols-1 gap-4">
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">

                    <div className="my-2 ">
                        <label htmlFor="bio" className="block mb-1 font-bold">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={bio}
                            onChange={handleBioChange}
                            className="w-full p-2 border text-black border-gray-400 rounded"
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="department" className="block mb-1 font-bold">
                            Departament
                        </label>
                        <select
                            name="department"
                            value={department}
                            onChange={handleDepartamentChange}
                            className="w-full p-2 border text-black border-gray-400 rounded"
                        >
                            <option value="testers">Select a department</option>
                            <option value="administration">administration</option>
                            <option value="testers">testers</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="image" className="block font-medium mb-1 text-gray-300">
                            Image
                        </label>
                        <div className="flex flex-wrap">
                            {image&&(
                                <img
                                    src={(URL.createObjectURL(image))}
                                    alt={image.name}
                                    className="w-16 h-16 object-cover border-2 border-gray-200 rounded-md mr-2 mb-2"
                                />
                            )
                            }
                        </div>
                        <div className="relative border-2 border-gray-200 rounded-md p-4 flex justify-center items-center">
                            <input

                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                            />
                            <div className="text-gray-400 w-6 h-6" />
                            <p className="ml-2 text-gray-400">Drag and drop or click to upload</p>
                        </div>
                    </div>

                    <div className="my-2">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            Submit changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


