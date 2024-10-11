import React from 'react';
import { MdError } from "react-icons/md";

function NotFound() {
  return (
    <div className='flex items-center justify-center'>
      <MdError className='mr-2 text-5xl text-red-500' />
      <p className='text-3xl text-white'>查無結果，請檢查城市名稱是否正確</p>
    </div>
  );
}

export default NotFound;