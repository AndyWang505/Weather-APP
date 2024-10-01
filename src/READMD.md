## 實作方法

使用 React + Tailwind CSS 開發，開發規範使用 ESLint。

將專案開發拆成 畫面佈局、基本功能、進階功能部分

開發流程，以畫面為優先，當撰寫好該區塊的畫面時，可以先撰寫簡單的邏輯，以呈現簡單資訊。

### 畫面佈局

希望能夠在 PC、平板、手機端 呈現

PC、平板端畫面佈局構思，預期頂部提供 Input 提供搜尋城市，上方欄位會呈現目前天氣資訊，下方欄位呈現未來五天天氣資訊（包含最高、最低溫）。

手機端畫面有參考經常使用的手機內建天氣工具，未來五天天氣預報原先使用 Swiper 透過 X 軸瀏覽，但參考手機內建天氣工具後，決定採用直式瀏覽更為直覺，且能一次看見未來五天天氣資訊。

### 基本功能

1. 首先可以得知專案需要透過 api 取得資料，並將資料呈現在畫面

    開始撰寫取得目前天氣及未來五天天氣 API，並將其匯出，在主頁匯入後，透過 useState 及 Map 將資料呈現在畫面。原先將該畫面所有內容撰寫在 Home.jsx 頁面，過程中將 目前天氣 和 未來五天天氣 拆成元件，避免邏輯混亂，再透過 props 的方式將資料傳遞到元件各別處理。

2. 使用者可以透過搜尋城市，取得該城市天氣資訊

    搜尋城市透過綁定 onSubmit 在表單用於觸發提交，同時撰寫一個 handleSubmit 處理提交後的邏輯，以及綁定 value 取得輸入的城市名稱，透過 useState 將城市名稱儲存並作為參數傳入先前撰寫的 API 中發送 get 方法取得該城市天氣資料。

3. 當天氣資訊載入時，需呈現載入動畫效果

    撰寫一個 Loading 元件，預期在匯入的頁面中會有一個狀態，控制是否該處發 Loading 效果，當 loading 狀態設為 true 時執行載入中。
    天氣資訊的 Zoomin 動畫呈現自訂 tailwind.config.js animation 完成，預期透過 transform scale 縮放，彈出的效果使用 cubic-bezier(0.68, -0.55, 0.27, 1.2) 的方式撰寫彈出速度。

### 進階功能

1. 使用 Firebase 製作 Google 登入登出

    查詢 Firebase Authentication [官方文件](https://firebase.google.com/docs/auth/web/google-signin?hl=zh-tw) 以及相關資料，預期登入登出流程使用 SDK，登入後跳轉到 '/' 路由 (Home.jsx) 首頁，到首頁時會檢查使用者是否已經登入，若沒有則導向回 '/login' 登入頁面。

2. 將使用者搜尋過的城市儲存在 Firebase 中

    查詢 Firebase Database 種類後，決定使用較為輕量的 RealTime Database，用於儲存搜尋紀錄，參考 Firebase RealTime Database [官方文件](https://firebase.google.com/docs/database/web/read-and-write?authuser=0&hl=zh-tw) 作法，預期流程會是使用者輸入城市名稱提交後的同時新增到 Firebase，搜尋紀錄參考 Google 搜尋引擎做法，且不希望有重複的紀錄，因此會檢查城市名稱是否已經存在，如果已存在則更新紀錄即可，同時能夠對搜尋紀錄做刪除動作。
    調整 Firebase 存取規則，僅有已登入用戶能夠操作讀取及寫入等操作。

3. 使用者可以透過過去搜尋過的城市來切換天氣資訊

    參考 Google 搜尋引擎做法，在點擊輸入框時會顯示過去搜尋紀錄的選單，透過該選單來切換要搜尋的城市天氣。

4. 當搜尋無結果時，呈現提示訊息

    撰寫一個 NotFound.jsx 元件，當搜尋無結果時，呈現該元件。

---

9/23 檢討

修正：

1. eslint 出現 prop-types 警告原因：因為 eslint-plugin-react 禁止在 React 元件中定義缺少 props 驗證，因此出現警告。無論你如何定義 props 類型，這個規則都會對它們進行驗證。

        解決方法：加入 `"react/prop-types": "off"` 的規則，並調整到 pluginReact 載入後。

2. 移除不必要的 setTimeOut function (原用於延遲動畫載入)

3. 表單送出使用鎖機制，防止用戶多次提交，造成不斷發送 api request。

重構：

1. 重構重複性質邏輯，將排序及取得過濾未來五天的方法抽出，改寫成純函式，使用 helper 統一管理。

2. 將 Home.jsx 儲存資料狀態邏輯抽出，以利維護和擴充。

        最後沒使用 hook 原因：不希望 hook 跟 api 有依賴關係，增加程式碼維護複雜度