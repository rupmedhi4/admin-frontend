import React from 'react'
import SideBar from '../sideBar/SideBar'
import TopBar from '../TopBar/TopBar'
import Demo2 from '../dashboard/Dashboard'
import Demoo from '../dashboard/Demoo'
import Dashboard from '../dashboard/Dashboard'

export default function home() {
  return (
    <>
      <TopBar/>
      <div className='flex'>
      <SideBar/>
      
      <Dashboard/>

      </div>
    
    </>
  )
}
