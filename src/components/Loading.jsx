import React from 'react'
import PropTypes from 'prop-types';

function Loading({ loading = false }) {
  if (!loading) return null

  return (
    <div className="bg-white fixed z-100 w-full opacity-30 flex items-center justify-center h-screen overflow-hidden loading-animation">
      {/* 使用 Tailwind 的 animate-bounce 讓文字有跳動的效果 */}
      <p className='text-2xl font-bold animate-bounce'>載入中...</p>
    </div>
  )
}

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading