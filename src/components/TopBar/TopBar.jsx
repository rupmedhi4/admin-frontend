import React from 'react'
import Avatar from './avatar/Avatar'

export default function TopBar() {
    return (
        <div>
            <div className="w-full bg-white shadow-sm px-4 py-4 flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-800">Figma</div>

                <div className="flex-1 max-w-sm mx-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <Avatar/>
            </div>

        </div>
    )
}
