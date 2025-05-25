import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className='flex flex-col h-screen justify-between'>
        <Header />
        <div className='flex-1'>
            {
                children
            }
        </div>
        <Footer />
    </div>
  )
}

export default Layout