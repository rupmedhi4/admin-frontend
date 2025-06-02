import React from 'react'
import SideBar from '../sideBar/SideBar'
import TopBar from '../TopBar/TopBar'
import Dashboard from '../dashboard/Dashboard'

export default function Home({ children }) {
  return (
    <>
      <TopBar />
      <div className='flex'>
        <SideBar />
        <div className='flex-1 '>
          {children}
        </div>
      </div>
    </>
  )
}
