import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineWbSunny } from "react-icons/md";

function CurrentWeather({ currentData }) {
  // 避免無資料時出現錯誤
  if (!currentData || !currentData.weather || !currentData.weather.length || !currentData.main) {
    return <></>;
  }

  return (
    <div className={`w-full bg-gradient-to-tr from-zinc-600 via-gray-600 text-white p-6 mb-6 rounded-xl shadow-xl animate-zoom-in`}>
      <h2 className='flex items-center text-xl'>
        <CiLocationOn className='mr-2' />
        {`目前${currentData.cityName} ${currentData.weather[0]?.main}`}
      </h2>
      <div className='flex justify-around items-center w-full text-xl md:text-2xl lg:px-24 md:px-6'>
        <div className='flex flex-col  items-center md:w-1/3'>
          <img src={`http://openweathermap.org/img/wn/${currentData.weather[0]?.icon}@4x.png`} alt={currentData.weather[0]?.description} className='hidden md:block' />
          <img src={`http://openweathermap.org/img/wn/${currentData.weather[0]?.icon}@2x.png`} alt={currentData.weather[0]?.description} className='block md:hidden' />
          <p className='text-2xl md:text-3xl'>{currentData.weather[0]?.description}</p>
        </div>
        <div className='md:flex md:grid md:grid-cols-2 md:w-2/3 pt-4'>
          <div className='flex items-center justify-center'>
            <p className='text-3xl font-bold md:text-5xl mb-4 md:mb-0'>{currentData.main?.temp}°</p>
          </div>
          <div className='text-center flex flex-col items-center justify-center space-y-2 text-base md:text-2xl'>
            <div className='space-y-2'>
              <p className='flex items-center'><MdOutlineWbSunny className='mr-2' /> 體感 {currentData.main?.feels_like}°</p>
              <p className='flex items-center'><FaTemperatureArrowDown className='mr-2' /> 最低 {currentData.main?.temp_min}°</p>
              <p className='flex items-center'><FaTemperatureArrowUp className='mr-2' /> 最高 {currentData.main?.temp_max}°</p>
            </div>
            <p className='flex items-center'><WiHumidity className='mr-2' /> 濕度 {currentData.main?.humidity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;