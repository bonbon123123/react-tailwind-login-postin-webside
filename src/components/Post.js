import React, { useState, useEffect } from 'react';
import './App.css';

export default function Post(props) {

    const { content } = props;
    const [imageUrl, setImageUrl] = useState(null);
    const [clicks, setClicks] = useState(0);

    const cangePicture = () => {
        setClicks(clicks + 1);
    };



    //console.log(content.images.length);

    useEffect(() => {

        if (clicks == content.images.length) {
            setClicks(0);
        }
        if (content.images[clicks] !== undefined) {


            fetch('/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: content.images[clicks] })
            })
                .then(response => response.blob())
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    setImageUrl(imageUrl);
                });
        }

    }, [clicks]);



    return (
        // <div className="flex items-center justify-center h-screen">
        //     <div className="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
        //         <p>{content.text}</p>
        //         {imageUrl && (
        //             <img src={imageUrl} alt="Post image" />
        //         )}
        //     </div>
        // </div>

        <div class="mx-auto max-w-7xl py-12 sm:px-2 sm:py-12 lg:px-2">
            <div class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24  lg:gap-x-20 lg:px-24 lg:pt-0 grid grid-cols-1 gap-4">


                <div class="lg:mt-8">
                    <h1 class="mt-0 text-2xl leading-8 text-gray-300"> Title</h1>
                </div>
                <div class="flex justify-start">
                    {imageUrl && (
                        <img src={imageUrl} onClick={cangePicture} alt="Post image" />
                    )}
                </div>
                <div class="lg:mt-8 mb-8">
                    <p class="mt-2 text-lg leading-8 text-gray-300"> eu sed consectetur Malesuada adipiscing sagittis vel nulla.</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <a href="#" class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Get started</a>
                        <a href="#" class="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></a>
                    </div>
                </div>
            </div>
        </div>


    );
}
