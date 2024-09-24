# 天氣預報 APP

![Image](/public/README-Banner.png)

## 專案介紹

此專案串接 OpenWeatherMap API 實作前端畫面，使用者能夠搜尋不同城市之目前天氣資訊、未來五天天氣預報（包含最高溫及最低溫等等資訊），能夠在不同裝置上呈現畫面。
同時使用 Firebase Authentication 完成簡易 Google 登入登出，並將過去搜尋紀錄保存，以利查詢。

### 資料夾結構

```
       
├─public    
│
└─src
    │  App.jsx
    │  App.test.js
    │  firebaseConfig.js
    │  index.css
    │  index.js
    │  READMD.md
    │  reportWebVitals.js
    │  setupTests.js
    │
    ├─api
    │  weather.js
    │      
    ├─components
    │  CurrentWeather.jsx
    │  Footer.jsx
    │  ForecastWeather.jsx
    │  Loading.jsx
    │  Navbar.jsx
    │  NotFound.jsx
    │      
    ├─Firebase
    │  DatabaseService.js
    │
    ├─helper
    │  getDailyData.js
    │  getSortedQuery.js
    │      
    └─pages
        Home.jsx
        Login.jsx
```

### 功能

* 搜尋城市天氣資訊

* Google 登入登出

* 保存過去搜尋紀錄，以利查詢

## 來源

API

* [openweathermap current](https://openweathermap.org/current)

* [openweathermap forecast5](https://openweathermap.org/forecast5)

Image

* [pixabay](https://pixabay.com/)

## 使用技術

* CRA

* React、React Hooks、React Router、React Icons

* Axios

* Tailwind css

* ESLint

* Prop-Types

* Firebase