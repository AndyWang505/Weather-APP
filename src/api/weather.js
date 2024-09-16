// 該檔案用於處理 openweathermap api 請求，參考 https://openweathermap.org/current
import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL
const apiKEY = process.env.REACT_APP_API_KEY

const axiosInstance = axios.create({ 
  baseURL: baseURL
})

axiosInstance.interceptors.response.use(
	(res) => {
		return res
	},
	(error) => {
		// do something to record the error
		return Promise.reject(error)
	}
)

// Current
export const getCurrentWeather = (cityName) => {
  return axiosInstance.get('/data/2.5/weather', {
    params: {
      q: cityName,
      lang: 'zh_tw',
      appid: apiKEY,
			units: 'metric'
    }
  });
};

// Forecast
export const getForecast = (cityName) => {
  return axiosInstance.get('/data/2.5/forecast', {
    params: {
      q: cityName,
      lang: 'zh_tw',
      appid: apiKEY,
			units: 'metric'
    }
  });
};