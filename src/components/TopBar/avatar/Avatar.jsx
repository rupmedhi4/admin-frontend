import React, { useState, useRef, useEffect } from 'react';

export default function Avatar() {
    const [avatar, setAvatar] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const fileInputRef = useRef(null);
    const containerRef = useRef(null);

    const handleAvatarClick = () => {
        setShowOptions((prev) => !prev);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
        setShowOptions(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    const handleChangeClick = () => {
        setAvatar(null);
        setShowOptions(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        }
        if (showOptions) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOptions]);

    return (
        <div ref={containerRef} className="relative inline-block text-left">
            <div
                onClick={handleAvatarClick}
                className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition duration-300"
                title="Click to change avatar"
            >
                {avatar ? (
                    <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-xl select-none">
                        👤
                    </div>
                )}
            </div>

            {showOptions && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                    <button
                        onClick={handleUploadClick}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
                    >
                        Upload Avatar
                    </button>
                    <button
                        onClick={handleChangeClick}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
                    >
                        Remove Avatar
                    </button>
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    );
}
