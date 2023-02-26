import React, { useState } from 'react';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit post data to server or perform necessary actions
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label htmlFor="title" className="text-lg font-medium">
                Title
            </label>
            <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="text" className="text-lg font-medium">
                Text
            </label>
            <textarea
                name="text"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            ></textarea>

            <label htmlFor="image" className="text-lg font-medium">
                Image
            </label>
            <input
                type="file"
                name="image"
                id="image"
                onChange={handleImageChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />

            <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
};

export default PostForm;
