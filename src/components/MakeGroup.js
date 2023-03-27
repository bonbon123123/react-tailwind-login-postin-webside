import { useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';


export default function MakeGroup(props) {
    const { token } = props;
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState();


    const handleImageChange = (event) => {
        const newImage = event.target.files[0];
        setImage(newImage);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };





    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        let jsonData = {
            name: name,
            description: description,
            created_at: Date.now(),
            created_by: token.id,
        }
        formData.append('jsonData', JSON.stringify(jsonData));
        if (image) {
            formData.append('image', image);
        }

        const URL = "http://localhost:3001/addGroup"
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        const result = await axios.post(URL, formData, config)
        console.log(formData);
        console.log("REsult: ", result);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="my-2">
                <label htmlFor="name" className="block mb-1 font-bold">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full p-2 border border-gray-400 rounded"
                />
            </div>

            <div className="my-2">
                <label htmlFor="bio" className="block mb-1 font-bold">
                    Bio
                </label>
                <textarea
                    name="bio"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="w-full p-2 border border-gray-400 rounded"
                />
            </div>

            <div className="mb-5">
                <label htmlFor="image" className="block font-medium mb-1 text-gray-300">
                    Image
                </label>
                <div className="flex flex-wrap">
                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={image.name}
                            className="w-16 h-16 object-cover border-2 border-gray-200 rounded-md mr-2 mb-2"
                        />
                    )}
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
                    Add User
                </button>
            </div>
        </form>

    )
}


