import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <footer className='bg-cyan-800 text-white flex justify-center gap-8 p-2 max-sm:flex-col items-center'>
        <h1 className='font-medium text-[14px] max-sm:font-light'>Copyright © 2025 Apple Inc. All rights reserved.</h1>
        <div className='space-x-2'>
           <InstagramIcon className='cursor-pointer' />
           <FacebookIcon className='cursor-pointer' />
           <XIcon className='cursor-pointer' />
           <YouTubeIcon className='cursor-pointer' /> 
        </div>
    </footer>
  )
}

export default Footer