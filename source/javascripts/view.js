// view
//以 pagination 函式 彙總物件為參數
function pageBtn(parameter) {
  // 宣告變數 "總頁碼" 使用於 for 迴圈 (負責產生頁碼) 的結束點
  const pageTotal = parameter.pageTotal;
  // 宣告組合字串
  let str = '';
  // 這邊就是 Model篇 "上一頁判斷式" 的布林值
  if (parameter.pre) {
    // 當發生 true 的時候，為正常狀態可以點擊呈現藍色狀態
    // ${Number(parameter.currentPage) - 1}
    // 意思是 "當前頁碼 - 1" 點擊後，以這個數值為參數導入 pagination 函式
    // 則分頁資料庫 pageData 就會改變，索引值就會回到上一頁
    str += `
		<li class="page-item">
			<a class="page-link" href="#" data-pages="${Number(parameter.currentPage) - 1}">
				< prev
			</a>
		</li>
		`;
  } else {
    // 當發生 false 的時候，加上 disabled Class 不能點擊呈現灰色狀態
    str += `
		<li class="page-item disabled">
			<a class="page-link" href="#">
				< prev
			</a>
		</li>
		`;
  }
  // for 迴圈增加頁碼，pageTotal為中斷點
  // 注意這邊是 >= 因為 "總頁碼" 5 時，還是要執行 1次 必須加上 =
  for (let i = 1; pageTotal >= i; i++) {
    // 當 "當前頁碼" 與 迴圈 i 相同時，則代表處於當前頁 故增加 active Class 呈現藍色背景點擊狀態
    if (Number(parameter.currentPage) === i) {
      str += `
			<li class="page-item active">
				<a class="page-link" href="#" data-pages="${i}">${i}</a>
			</li>
			`;
    } else {
      // 反之其他頁碼時，就沒有 active Class
      str += `
			<li class="page-item">
				<a class="page-link" href="#" data-pages="${i}">${i}</a>
			</li>
			`;
    }
  }
  // 這邊就是 Model篇 "下一頁判斷式" 的布林值
  if (parameter.next) {
    // 當發生 true 的時候，為正常狀態可以點擊呈現藍色狀態
    // ${Number(parameter.currentPage) + 1}
    // 意思是 "當前頁碼 + 1" 點擊後，以這個數值為參數導入 pagination 函式
    // 則分頁資料庫 pageData 就會改變，索引值就會來到下一頁
    str += `
		<li class="page-item"> 
			<a class="page-link" href="#" data-pages="${Number(parameter.currentPage) + 1}">
				next >
			</a>
		</li>
		`;
  } else {
    // 當發生 false 的時候，加上 disabled Class 不能點擊呈現灰色狀態
    str += `
		<li class="page-item disabled">
			<a class="page-link" href="#">
				next >
			</a>
		</li>
		`;
  }
  page.innerHTML = str;
}

function dataHtml(parameter) {
  let str = '';
  for (let i = 0; i < parameter.length; i++) {
    str += `
		<div class="col-md-6 mb-3">
			<div class="card">
				<div class="card border-0">
					<img src="${parameter[i].Picture1}" class="card-img-top img-fluid" alt="" style="max-height: 220px">
					<div class="card-img-overlay d-flex align-items-end justify-content-between text-white">
						<h4 class="card-text mb-0">${parameter[i].Name}</h4>
						<p class="card-text">${parameter[i].Zone}</p>
					</div>
				</div>
				<div class="card-body">
					<p class="card-text date">${parameter[i].Opentime}</p>
					<p class="card-text address">${parameter[i].Add}</p>
					<div class="d-flex justify-content-between">
						<p class="card-text tel">${parameter[i].Tel}</p>
						<p class="card-text mb-3 teg">${parameter[i].Ticketinfo}</p>
					</div>
				</div>
			</div>
		</div>
		`;
  }
  data.innerHTML = str;
}

function upMenu(parameter) {
  // 先準備空陣列，它是地區資料庫
  const tempArrayZone = [];
  for (let i = 0; parameter.length > i; i++) {
    tempArrayZone.push(allData[i].Zone);
  }
  // 過濾重覆 地區
  const noRepeatZone = Array.from(new Set(tempArrayZone));
  const noRepeatZoneLen = noRepeatZone.length;
  // view
  for (let i = 0; i < noRepeatZoneLen; i++) {
    const addOption = document.createElement('Option');
    addOption.textContent = noRepeatZone[i];
    addOption.setAttribute('value', noRepeatZone[i]);
    selectZone.appendChild(addOption);
  }
  // 這是地區判斷值，留給分頁按鈕函式
  // 判斷現在頁面地區，是顯示哪一個地區，預設 HTML 是隱藏的
  zoneTitle.textContent = '全部地區';
}
