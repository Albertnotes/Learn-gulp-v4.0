// 使用 IIFE 函式
(function getText() {
  // 建立物件
  const request = new XMLHttpRequest();
  // 設定請求
  request.open(
    'get',
    'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97'
  );
  // 使用非同步處理的話，必須定義事件監聽
  request.onreadystatechange = function() {
    // 如果回應已完成 4 並且已成功 200 。
    if (request.readyState === 4 && request.status === 200) {
      // 以 JSON 解析字串轉為物件
      const data = JSON.parse(request.responseText);
      // 抓取資料層陣列長度
      const dataLen = data.result.records.length;
      // 使用 for 迴圈 以索引值 push 到 allData 全地區資料庫
      for (let i = 0; dataLen > i; i++) {
        allData.push(data.result.records[i]);
      }
      upMenu(allData);
      pagination(allData, 1);
    }
  };
  request.send(null);
})();

function pagination(importData, displayPage) {
  // 參數 "取得總資料筆數"
  const alldataTotal = importData.length;
  // 設定 "單頁顯示筆數"
  const eachdataTotal = 6;
  // 計算 "總資料筆數" / "單頁顯示筆數" 等於 "總頁數"
  // 使用 Math.ceil 確定數值為整數
  const pageTotal = Math.ceil(alldataTotal / eachdataTotal);
  // 參數 "取得當前頁數"
  let currentPage = displayPage;
  // 原則上，整體邏輯函式完整，但避免不可預知的因素。
  // 例如請觀看膽小狗英雄 - 發神經篇 - 主角displayPage
  // 若 "當前頁數" 大於 "總頁數" 時，增加 判斷 "當前頁數"就等於"總頁數"
  if (currentPage > pageTotal) {
    currentPage = pageTotal;
  }
  // 計算 "當前頁顯示筆數"，"起始點" 與 "結束點"
  const minNumber = currentPage * eachdataTotal - eachdataTotal + 1;
  const maxNumber = currentPage * eachdataTotal;
  // 假設 當前頁 為 x = 5
  // (x * 6) - 6 + 1 = 25  起始點 +1 是因為陣列 以 0 起算
  // (x * 6) = 30 結束點
  // 先準備空陣列，它是分頁資料庫
  const pageData = [];
  // 以參數(資料庫)使用 forEach 功能跟 for 相同可以加入索引值。
  importData.forEach((element, index) => {
    const number = index + 1;
    if (number >= minNumber && number <= maxNumber) {
      pageData.push(element);
    }
  });
  // --- 下面是解釋 - 請自己比對我說哪行，因為太過嘮叨就放在下面 ---
  // 為什麼 number 要 +1，因為陣列以 0 起算要 +1
  // 不想 +1 的話則結束點要 -1 並移除起始點 +1
  // 不過以我們小學運算邏輯，我們就使用 1 起算 +1 唄
  // 這邊的判斷以上方 x = 5 為例，起始點 25 結束點 30
  // 設 number 為 y
  // y >= 25 並且 y <= 30 回傳 true
  // 那麼什麼時候會是 true。
  // 當迴圈第一圈索引值 0 + 1 = number，那麼 number 就會是 1
  // 這個時候執行 push，會把參數(資料庫)的陣列索引值 0 push 上去。
  // 那為什麼是 0 ，因為陣列是以 0 開始起算阿! 老師在講有沒有在聽???
  // 故 x = 5 的時候，起始點 25 結束點 30 它會怎麼跑呢??
  // number = 25 ~ 30 會是 true
  // number = 1 ~ 24 與 31 ~ 100 會是 false
  // 說完覺得上述兩行是廢話 XDD，但是想一下應該可以理解齁
  // 所以當 true 就會 push 索引值陣列 = 24 ~ 29
  // 不要再問為什麼是 24 ~ 29 打你齁
  // 建立物件彙總，產生按鈕需要的訊息。
  const pageManager = {
    pageTotal, // 總頁碼
    currentPage, // 當前頁碼
    pre: currentPage > 1, // 上一頁判斷式
    next: currentPage < pageTotal // 下一頁判斷式
  };

  // 上一頁判斷式
  // 假設 "當前頁" 5  > 1 表示成立
  // 因為有 1.2.3.4 可以往前切
  // 假設 "當前頁" 1 > 1 表示不成立
  // 因為 你在第 1 頁啊!

  // 下一頁判斷式
  // 假設 "當前頁" 5  < "總頁碼" 6 表示成立
  // 因為還可以往後切換 1頁
  // 假設 "當前頁" 6 < "總頁碼" 6 表示不成立
  // 因為你在第 6 頁啊!
  pageBtn(pageManager); // 產生 分頁按鈕
  dataHtml(pageData); // 使用分頁資料庫，限制動態產生 HTML 的數量
}
