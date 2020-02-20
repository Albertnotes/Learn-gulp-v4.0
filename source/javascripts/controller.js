// controller
function chickZone(e) {
  // 阻止元素默認的行為
  e.preventDefault();
  // 不是 A 元素的傢伙退散!!
  if (e.target.nodeName !== 'A') {
    return;
  }
  // 特定地區資料庫 zoneData
  // 執行前先清空上一個函式可能 push 的資料
  zoneData.length = 0;
  // 這是地區判斷值，留給分頁按鈕函式
  // 判斷現在頁面地區，是顯示哪一個地區，預設 HTML 是隱藏的
  zoneTitle.textContent = e.target.textContent;
  // 設計上，有全部地區，故這邊有 switch
  // 比對 表達式 裡頭的值是否符合 case 條件
  switch (true) {
    // 當點擊數值，不是全部地區
    case e.target.textContent !== '全部地區':
      // 組合特定地區資料庫 zoneData
      for (let i = 0; allData.length > i; i++) {
        // 如果點擊地區與陣列地區相同時，則 push 該陣列索引值
        if (e.target.textContent === allData[i].Zone) {
          zoneData.push(allData[i]);
        }
      }
      // 以 "特定地區資料庫" 為 "資料庫參數"
      pagination(zoneData, 1);
      break;
    // 預設
    default:
      // 以 "全地區資料庫" 為 "資料庫參數"
      pagination(allData, 1);
      break;
  }
}

function changeZone(e) {
  // 特定地區資料庫 zoneData
  // 執行前先清空上一個函式可能 push 的資料
  zoneData.length = 0;
  // 這是地區判斷值，留給分頁按鈕函式
  // 判斷現在頁面地區，是顯示哪一個地區，預設 HTML 是隱藏的
  zoneTitle.textContent = e.target.value;
  // 設計上，有全部地區，故這邊有 switch
  // 比對 表達式 裡頭的值是否符合 case 條件
  switch (true) {
    // 當點擊數值，不是全部地區
    case e.target.value !== '全部地區':
      // 組合特定地區資料庫 zoneData
      for (let i = 0; allData.length > i; i++) {
        // 如果點擊地區與陣列地區相同時，則 push 該陣列索引值
        if (e.target.value === allData[i].Zone) {
          zoneData.push(allData[i]);
        }
      }
      // 以 "特定地區資料庫" 為 "資料庫參數"
      pagination(zoneData, 1);
      break;
    // 預設
    default:
      // 以 "全地區資料庫" 為 "資料庫參數"
      pagination(allData, 1);
      break;
  }
}

function clickPage(e) {
  // 阻止元素默認的行為
  e.preventDefault();
  // 不是 A 元素的傢伙退散!!
  if (e.target.nodeName !== 'A') {
    return;
  }
  // 抓取點擊按鈕的 data 值，為參數導入 pagination函式
  const page = e.target.dataset.pages;
  // zoneTitle 是我們在選單及地區，新增的地區判斷值
  // 可以使用於這裡，提供其他函式判斷整體頁面的狀態。
  switch (true) {
    case zoneTitle.textContent !== '全部地區':
      // 當全部地區以外時，特定地區資料庫會有資料。
      pagination(zoneData, page);
      break;
    default:
      // 預設使用全地區資料庫。
      pagination(allData, page);
      break;
  }
}

page.addEventListener('click', clickPage);
selectZone.addEventListener('change', changeZone);
popularssZone.addEventListener('click', chickZone);
