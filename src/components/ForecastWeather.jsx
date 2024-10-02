import React from 'react';
import { CiCalendar } from "react-icons/ci";
import DailyWeather from './DailyWeather';

function ForecastWeather({ forecastData }) {
  // 用於將 Date 轉換為星期
  const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  return (
    <div className={`w-full bg-gradient-to-tr from-zinc-600 via-gray-600 text-neutral-200 p-3 md:p-6 rounded-xl shadow-xl hover:scale-105 animate-zoom-in`}>
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
              <DailyWeather key={item.dt} dayOfWeek={dayOfWeek} item={item} />
            );
          })
        }
      </ul>
    </div>
  );
}

export default ForecastWeather;