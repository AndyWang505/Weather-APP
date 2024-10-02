import React from 'react';

function DailyWeather({ dayOfWeek, item}) {
  return (
    <li key={item.dt} className="flex md:flex-col items-center justify-around text-center pt-4 md:p-2 border-t border-neutral-400 md:border-0 transition-transform transform hover:-translate-y-2 hover:scale-105 hover:text-white">
      <div>
        <p>{dayOfWeek} {item.weather[0].main}</p>
        <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} className='mx-auto' />
        <p>{item.weather[0].description}</p>
      </div>
      <p className='text-3xl md:text-2xl md:my-4'>{item.main.temp}°</p>
      <div>
        <p>體感 {item.main.feels_like}°</p>
        <div className="flex justify-center sm:space-x-2 text-sm">
          <p>最低 {item.main.temp_min}°</p>
          <p>最高 {item.main.temp_max}°</p>
        </div>
      </div>
    </li>
  );
}

export default DailyWeather;
