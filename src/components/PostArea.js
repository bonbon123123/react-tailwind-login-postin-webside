import React, { useState } from "react";
import axios from 'axios';


function PostArea(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [permission, setPermission] = useState("");
    const [images, setImages] = useState([]);
    const { user } = props;

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handlePermissionChange = (event) => {
        setPermission(event.target.value);
    };
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleImageChange = (event) => {
        const newImages = Array.from(event.target.files);
        setImages((prevImages) => [...prevImages, ...newImages]);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        let jsonData = {
            "user": user,
            "title": title,
            "permission": permission,
            "content": content
        }
        formData.append('jsonData', JSON.stringify(jsonData));

        images.forEach((image, index) => {
            formData.append(image, image);
        });

        const URL = "http://localhost:3001/upload"
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        const result = await axios.post(URL, formData, config)
        console.log(formData);
        console.log("REsult: ", result);
    }


    return (

        <div class="mx-auto max-w-7xl py-12 sm:px-2 sm:py-12 lg:px-2">
            <div class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24  lg:gap-x-20 lg:px-24 lg:pt-0 grid grid-cols-1 gap-4">
                <h2 className="mt-2 text-2xl leading-8 text-gray-300">New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-0 text-2xl leading-8 ">
                        <label htmlFor="title" className="block font-medium mb-1 text-gray-300">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            className="w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mt-0 text-2xl leading-8 ">
                        <label htmlFor="content" className="block font-medium mb-1 text-gray-300">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={handleContentChange}
                            className="w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mt-0 text-2xl leading-8 ">
                        <label htmlFor="content" className="block font-medium mb-1 text-gray-300">
                            permission
                        </label>
                        <select
                            name="permission"
                            value={permission}
                            onChange={handlePermissionChange}
                            className="w-full p-2 border border-gray-400 rounded"
                        >
                            <option value="">Select permissions</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="images" className="block font-medium mb-1 text-gray-300">
                            Images
                        </label>
                        <div className="flex flex-wrap">
                            {images.map((image) => (
                                <img
                                    key={image.name}
                                    src={URL.createObjectURL(image)}
                                    alt={image.name}
                                    className="w-16 h-16 object-cover border-2 border-gray-200 rounded-md mr-2 mb-2"
                                />
                            ))}
                        </div>
                        <div className="relative border-2 border-gray-200 rounded-md p-4 flex justify-center items-center">
                            <input
                                id="images"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                            />
                            <div className="text-gray-400 w-6 h-6" />
                            <p className="ml-2 text-gray-400">Drag and drop or click to upload</p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mb-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PostArea;