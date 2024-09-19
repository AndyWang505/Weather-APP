import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
// Firebase
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // 登出後返回 /login 頁面
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-slate-900'>
      <nav className='max-w-7xl mx-auto w-full flex justify-end'>
        <button type='button' className='flex items-center text-xl text-white p-2 hover:text-neutral-300' onClick={handleLogout}>
          <FaGoogle className='mr-2' />
          登出
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
