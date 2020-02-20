//DOM
const data = document.querySelector('#dataContainer');
const page = document.querySelector('#pageContainer');
const selectZone = document.querySelector('#selectZoneContainer');
const popularssZone = document.querySelector('#popularssZone');
const zoneTitle = document.querySelector('#zoneTitle');

// Model
// 宣告陣列變數，用以儲存資料庫
const allData = []; //全地區資料庫，複數以上的函式會使用到，所以寫在全域
const zoneData = []; // 特定地區資料庫，複數以上的函式會使用到，所以寫在全域
