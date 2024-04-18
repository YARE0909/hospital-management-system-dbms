import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className='w-full h-14 border-b flex justify-between items-center px-6'>
      <div>
        <h1 className='font-bold'>MediCare</h1>
      </div>
      <div>
        {/* Make navbar components */}
        <ul className='flex space-x-4'>
          <li>
            <Link href='#' className='text-gray-500 hover:text-gray-400 duration-300'>Home</Link>
          </li>
          <li>
            <Link href='#' className='text-gray-500 hover:text-gray-400 duration-300'>About</Link>
          </li>
          <li>
            <Link href='#' className='text-gray-500 hover:text-gray-400 duration-300'>Services</Link>
          </li>
          <li>
            <Link href='#' className='text-gray-500 hover:text-gray-400 duration-300'>Contact</Link>
          </li>
        </ul>
      </div>
      {/* Add your navbar content here */}
    </nav>
  );
};

export default Navbar;