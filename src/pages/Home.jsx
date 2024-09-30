import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoMdTime } from "react-icons/io";
// Components
import CurrentWeather from '../components/CurrentWeather';
import ForecastWeather from '../components/ForecastWeather';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
// API
import { getCurrentWeather, getForecast } from '../api/weather';
// Helper
import { getSortedQuery } from '../helper/getSortedQuery';
import { getDailyData } from '../helper/getDailyData';
// Firebase
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getSearchQuery, updateSearchQuery, deleteSearchQuery } from '../Firebase/DatabaseService';

const now = new Date();
const formattedDate = now.toLocaleString();

function Home() {
  // 資料狀態
  const [currentData, setCurrentData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState([]);
  // 特效狀態
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // 事件監聽
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  // 檢查是否已登入，若未登入則導向回 /login 頁面
  const logoutCheck = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  };

  // 儲存資料狀態
  const storeDataState = async function() {
    const resCurrent = await getCurrentWeather(inputValue);
    setCurrentData({ ...resCurrent.data, cityName: inputValue });
    const resForecast = await getForecast(inputValue);
    setForecastData(getDailyData(resForecast));
  }

  // 送出表單
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (inputValue.trim() === '') return setError(true);
      setLoading(true);
      setError(false);
      setShowDropdown(false);
      // 新增或更新搜尋紀錄
      await updateSearchQuery(inputValue);
      // 重新取得搜尋紀錄
      const res = await getSearchQuery();
      // 依據 timestamp 時間排降序
      setSearchQuery(getSortedQuery(res));
      // 儲存資料狀態
      await storeDataState();
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // 當選擇選單的城市紀錄
  const handleSelectRecord = async (inputValue) => {
    try {
      setLoading(true);
      setError(false);
      setShowDropdown(false);
      // 新增或更新搜尋紀錄
      await updateSearchQuery(inputValue);
      // 儲存資料狀態
      await storeDataState();
      setInputValue(inputValue);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // 當點擊選單刪除時，刪除該筆資料
  const handleDeleteRecord = async (searchQueryItem) => {
    try {
      setError(false);
      // 刪除該筆搜尋紀錄
      await deleteSearchQuery(searchQueryItem);
      // 重新取得搜尋紀錄
      const res = await getSearchQuery();
      // 如果紀錄已清空，則傳入空陣列
      if(res === null) {
        setSearchQuery([]);
        return;
      }
      // 依據 timestamp 時間排降序
      setSearchQuery(getSortedQuery(res));
    } catch (error) {
      console.error(error);
    }
  };

  // 監聽點擊外層關閉選單
  const handleClickOutside = (event) => {
    // 如果點擊的是選單以外的元素則關閉
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
    // 如果點擊的是 Input，則開啟選單
    if (inputRef.current && inputRef.current.contains(event.target)) {
      setShowDropdown(true);
    }
  };

  // 預設載入資料並檢查是否已登入，以及 Zoomin 動畫效果
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        logoutCheck();
        setLoading(true);
        // 預設載入資料
        const resCurrent = await getCurrentWeather('新竹市');
        setCurrentData({ ...resCurrent.data, cityName: '新竹市' });
        const resForecast = await getForecast('新竹市');
        setForecastData(getDailyData(resForecast));
        // 取得搜尋紀錄
        const res = await getSearchQuery();
        // 依據 timestamp 時間排降序
        setSearchQuery(getSortedQuery(res));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
    // 監聽滑鼠事件，用於使用者點擊外部時關閉選單
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 移除監聽，防止 Memory Leak
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    // ref 用於監聽滑鼠點擊事件，判斷是否該關閉選單
    <main className={`bg-slate-800 ${loading ? 'h-screen' : null}`}>
      <Loading loading={loading} />
      <Navbar />
      {/* 避免出現搜尋無結果提示時，因畫面沒有元素而無法撐出高度 */}
      <div className={`p-6 md:p-12 mb-12 max-w-6xl mx-auto ${error ? 'h-screen' : null}`}>
        <section className='mb-12'>
          <div className='banner bg-cover bg-center bg-no-repeat min-h-[280px] rounded-2xl flex justify-center items-center'>
            <h1 className='text-5xl font-bold text-neutral-100 text-shadow-lg'>天氣預報 APP</h1>
          </div>
          {/* ref 用於監聽是否點擊到 Input 或選單，判斷是否該關閉選單 */}
          <form className='w-full flex justify-center mt-6 md:-mt-8' onSubmit={handleSubmit} ref={menuRef}>
            <label htmlFor="" className='flex items-center w-full max-w-3xl relative shadow-indigo-500/50'>
              <FaSearch className='absolute left-4 text-2xl' />
              <input type="text"
                className='w-full border-2 pl-12 py-2 md:py-4 pr-4 rounded-xl text-base md:text-xl shadow-xl'
                placeholder='輸入想查詢的城市'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                ref={inputRef}
              />
            </label>
          </form>
          <div className='relative left-0 w-full max-w-3xl mx-auto mt-1 bg-slate-900 rounded-md'>
            {
              // 必須在 showDropdown 狀態為 true，以及 searchQuery 有值的情況下才能顯示選單
              showDropdown && searchQuery && (
                // ref 用於監聽是否點擊到 Input 或選單，判斷是否該關閉選單
                <ul className='absolute z-10 w-full bg-slate-800 max-h-[180px] border-2 border-neutral-500 rounded-md overflow-auto scrollbar-style scrollbar-thumb-style' ref={menuRef}>
                  {
                    searchQuery?.map((item, index) => (
                      <li key={index} className='text-neutral-400 text-base md:text-xl hover:bg-slate-700 rounded-md hover:text-slate-300'
                        onClick={() => handleSelectRecord(item.searchQuery)}
                      >
                        <button className='w-full flex justify-between items-center py-2 pl-4 pr-4' type='button'>
                          <div className='flex items-center'>
                            <IoMdTime className='mr-4' />
                            {item.searchQuery}
                          </div>
                          <RxCross2
                            onClick={(e) => {
                              // 避免同時觸發 handleSelectRecord
                              e.stopPropagation();
                              handleDeleteRecord(item.searchQuery);
                            }}
                          />
                        </button>
                      </li>
                    ))
                  }
                </ul>
              )
            }
          </div>
        </section>
        {
          // 如果沒有搜尋到資料，則顯示 error 查無資料
          error ? <NotFound /> : (
            <div>
              <p className='text-neutral-400 text-xl mb-4'>{formattedDate}</p>
              {/* 在 loading 設成 true 時隱藏，當資料完全載入後，將 loading 設成 false 呈現該元件，主要是為了在資料重新載入時可以再次顯示 Zoomin 動畫效果 */}
              {loading ? null : <CurrentWeather currentData={currentData} />}
              {loading ? null : <ForecastWeather forecastData={forecastData} />}
            </div>
          )
        }
      </div>
      {/* 當 loading 時隱藏，避免 Footer 在資料載入前提早出現 */}
      {loading ? null : <Footer />}
    </main>
  );
}

export default Home;
