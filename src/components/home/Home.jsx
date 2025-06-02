import React from 'react'
import SideBar from '../sideBar/SideBar'
import TopBar from '../TopBar/TopBar'

export default function Home({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  )
}
