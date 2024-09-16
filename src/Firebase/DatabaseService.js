// 該檔案，用於拆分 Firebase Realtime Database 操作邏輯，集中管理，避免主畫面邏輯混亂
// Firebase Realtime Database 操作，參考 https://firebase.google.com/docs/database/web/read-and-write?authuser=0&hl=zh-tw
import { database } from '../firebaseConfig';
import { ref, set, get, child, push, query, orderByChild } from 'firebase/database';

// 新增搜尋紀錄，如果重複則更新該筆紀錄
export const updateSearchQuery = async (inputValue) => {
  try {
    const searchRecordsRef = ref(database, 'searchRecords/');
    const recordsQuery = query(searchRecordsRef, orderByChild('searchQuery'));
    const snapshot = await get(recordsQuery);
    let existingRecordKey = null;
    // 搜尋是否有重複紀錄
    if (snapshot.exists()) {
      snapshot.forEach(childSnapshot => {
        const data = childSnapshot.val();
        if (data.searchQuery === inputValue) {
          existingRecordKey = childSnapshot.key;
        }
      });
    }
    // 如果找到則更新, 否則新增
    if (existingRecordKey) {
      await set(ref(database, `searchRecords/${existingRecordKey}`), {
        searchQuery: inputValue,
        timestamp: new Date().toISOString(),
      });
      query(searchRecordsRef, orderByChild('timestamp'));
    } else {
      const newRecordRef = push(searchRecordsRef);
      await set(newRecordRef, {
        searchQuery: inputValue,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// 取得搜尋紀錄
export const getSearchQuery = async () => {
  try {
    const snapshot = await get(child(ref(database), 'searchRecords'));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};
