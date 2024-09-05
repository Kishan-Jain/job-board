import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components'

function HomeLayout() {
  return (
    <>
    < Outlet />
    < Footer />
    </>
  )
}

export default HomeLayout