import React, { useState, useEffect } from 'react';
import './App.css';
import User from './User'
export default function UserBar(props) {
    const { content } = props;

    const userComponents =
        content && content.length > 0 ? (
            content.map((user, index) => {
                return (
                    <div key={index}>
                        <User content={user} />
                    </div>
                );
            })
        ) : (
            <p>Loading Users...</p>
        );




    return (

        <div className="flex flex-col w-full h-full p-1 bg-gray-900 rounded-lg overflow-y-scroll">
            {userComponents}
        </div>


    );
}
