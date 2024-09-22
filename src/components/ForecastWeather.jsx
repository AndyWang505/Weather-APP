import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CiCalendar } from "react-icons/ci";

function ForecastWeather({ forecastData }) {
  const [isVisible, setIsVisible] = useState(true);

  // 用於將 Date 轉換為星期
  const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [forecastData]);

  return (
    <div className={`w-full bg-gradient-to-tr from-zinc-600 via-gray-600 text-neutral-200 p-3 md:p-6 rounded-xl shadow-xl hover:scale-105 ${isVisible ? 'animate-zoom-in' : 'opacity-0'}`}>
      <h2 className='flex items-center md:border-b border-neutral-400 pb-4 md:mb-4'>
        <CiCalendar className='mr-1' />
        未來五天天氣預報
      </h2>
      <ul className="flex flex-col md:grid grid-cols-5 gap-4">
        {
          forecastData.map((item) => {
            // 主要是為了將 item.dt_txt 資料(2024-09-19 18:00:00) 轉為適合閱讀的星期
            // IOS 裝置須符合 ISO 8601 標準，Z 表示 UTC 時區
            const isoDateString = item.dt_txt.replace(' ', 'T') + 'Z';
            const date = new Date(isoDateString);
            const dayOfWeek = daysOfWeek[date.getDay()];
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
          })
        }
      </ul>
    </div>
  );
}

// 檢查接收到的 forecastData 型別
ForecastWeather.propTypes = {
  forecastData: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number.isRequired,
      dt_txt: PropTypes.string.isRequired,
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
        humidity: PropTypes.number.isRequired,
        feels_like: PropTypes.number.isRequired,
        temp_min: PropTypes.number.isRequired,
        temp_max: PropTypes.number.isRequired
      }).isRequired,
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          main: PropTypes.string.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired
};

export default ForecastWeather;