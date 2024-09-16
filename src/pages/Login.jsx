import React from 'react'
import Footer from '../components/Footer';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  
  const handleGoogle = async () => {
    try {
      // 登入後跳轉至首頁
      const provider = await new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <div className='p-6 py-24 md:p-24 mb-24 max-w-7xl mx-auto min-h-custom'>
        <img src="https://cdn.pixabay.com/photo/2019/04/29/20/41/amsterdam-4167026_1280.png" alt="" className='w-80 mx-auto mb-6' />
        <h1 className='text-3xl font-bold text-center mb-8'>天氣預報 APP</h1>
        <form className='max-w-md mx-auto bg-neutral-200 p-6 rounded-lg shadow-lg space-y-4'>
          <button 
            type="button" 
            onClick={handleGoogle} 
            className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <FaGoogle className='mr-2' />
            使用 Google 登入
          </button>
        </form>
      </div>
      <Footer />
    </main>
  )
}

export default Login
