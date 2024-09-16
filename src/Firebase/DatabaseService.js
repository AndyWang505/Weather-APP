// 該檔案，用於拆分 Firebase Realtime Database 操作邏輯，集中管理，避免主畫面邏輯混亂
// Firebase Realtime Database 操作，參考 https://firebase.google.com/docs/database/web/read-and-write?authuser=0&hl=zh-tw
import { database, auth } from '../firebaseConfig';
import { ref, set, get, child, push, query, orderByChild, remove, equalTo } from 'firebase/database';

// 新增搜尋紀錄，如果重複則更新該筆紀錄
export const updateSearchQuery = async (inputValue) => {
  try {
    // 取得用戶的 UID
    const userId = auth.currentUser.uid;
    const searchRecordsRef = ref(database, `searchRecords/${userId}`);
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
      await set(ref(database, `searchRecords/${userId}/${existingRecordKey}`), {
        searchQuery: inputValue,
        timestamp: new Date().toISOString(),
      });
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
    // 取得用戶的 UID
    const userId = auth.currentUser.uid;
    const snapshot = await get(child(ref(database), `searchRecords/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

// 刪除該筆搜尋紀錄
export const deleteSearchQuery = async (searchQueryItem) => {
  try {
    // 取得用戶的 UID
    const userId = auth.currentUser.uid;
    const searchRecordsRef = ref(database, `searchRecords/${userId}`);
    // 在 searchRecordsRef 路徑下查詢符合條件的記錄
    const recordsQuery = query(searchRecordsRef, orderByChild('searchQuery'), equalTo(searchQueryItem));
    const snapshot = await get(recordsQuery);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        // 取得符合條件的記錄的 key
        const recordKey = childSnapshot.key;
        // 刪除該記錄
        const recordRef = ref(database, `searchRecords/${userId}/${recordKey}`);
        remove(recordRef);
      });
    } else {
      console.log(`No record found with searchQuery "${searchQueryItem}".`);
    }
  } catch (error) {
    console.error(error);
  }
};