const setContent = (id, contentArray, contentType) => {
    let el = document.getElementById(id);
    let modalDisplay = document.getElementById('modalDisplay');

    contentArray.map((item, index) => {
        let contentModel = '';
        switch (contentType) {
            case 'date':
                contentModel = `現在日期: ${new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })}`;
                break;
            case 'basic':
                contentModel = `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}"
                        aria-expanded="true" aria-controls="collapse${index}">
                        ${item.key}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse ${item.isShow ? 'show' : ''}" aria-labelledby="heading${index}"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        ${item.value}
                    </div>
                </div>
            </div>`
                break;
            case 'tableHead':
                contentModel = `<th scope="col">${item}</th>`
                break;
            case 'tableInfo':
                contentModel = `<tr>
                <th scope="row">${index + 1}</th>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.price}</td>
                <td>
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal${index}-${id}">
                        備註
                    </button>    
                </td>
                <td>${item.addBedOk === true ? '<i class="fa-regular fa-circle" style="color:white"></i>' : item.addBedOk === null ? '<i class="fa-solid fa-question"></i>' : '<i class="fa-solid fa-xmark" style="color:white"></i>'}</td>
                <td>${item.addInfantBedOk === true ? '<i class="fa-regular fa-circle" style="color:white"></i>' : item.addInfantBedOk === null ? '<i class="fa-solid fa-question"></i>' : '<i class="fa-solid fa-xmark" style="color:white"></i>'}</td>
            </tr>`;
                modalDisplay.innerHTML += `<div class="modal fade" id="exampleModal${index}-${id}" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${item.name}-${item.type} $ ${item.price}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${item.note}
                    </div>
                    <div class="modal-body">
                       <a href="${item.img}"> <img src="${item.img}" width="98%" style="border-radius:5px" /></a>
                    </div>
                    
                </div>
            </div>
        </div>`
                break;
            case 'schedule':
                contentModel = `<tr>
                        <td>${item.time}</td>
                        <td>${item.name}</td>
                        <td>${item.url === '' ? '' : `<a target="_blank" href="${item.url}">${item.urlName}</a>`}</td>
                    </tr>`
                break;
            default:
                break;
        }

        el.innerHTML += contentModel
    })
}



const accordionData = [
    {
        key: '園區基本資訊',
        value: `園區名稱：藍鵲渡假莊園<br>
園區地址：<a target="_blank" href='https://www.google.com.tw/maps/place/%E8%97%8D%E9%B5%B2%E6%B8%A1%E5%81%87%E8%8E%8A%E5%9C%92/@24.4466032,120.7190907,17z/data=!3m1!4b1!4m6!3m5!1s0x3469062e405b9901:0x1084edfcb9d75e04!8m2!3d24.4466032!4d120.7216603!16s%2Fg%2F11b6gqz_2g?entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D'>苗栗縣通霄鎮南和里111號</a><br><br>
客服專線：04-25676338<br>
服務時間：周一～周六9:00-18:00 <br>莊園現場服務專線：037-783790<br><br>
公共設施：高爾夫球推桿區、兒童戲水池、砂池、多功能運動場、兒童溜滑梯
<br>營區雨備場有提供冷藏公共冰箱<br><br><br>
補充說明：<br>
1. 自行開車：
‧請由國道一號三義交流道下，往三義方向，過三義火車站後，由中正路高架橋旁轉入苗48鄉道，沿苗48鄉道直行約10分鐘接121縣道，即可抵達藍鵲渡假莊園（南和國中旁）。
‧請由國道三號通霄交流道下，往通霄市區直行接台1線左轉，過通霄隧道後左轉接121縣道，直行約10分鐘即可抵達藍鵲渡假莊園（南和國中旁）。<br><br>
2.大眾運輸：
‧出「通霄火車站」後前行至 (和平路) 路口(站牌在通霄郵局旁邊)，搭乘苗栗客運往「福興站或大坑尾站」方向於「南和派出所」下車，即可抵達藍鵲渡假莊園。
3.出「通霄火車站」後搭乘計程車, 約15分鐘可抵達藍鵲渡假莊園, 車資約250-350元。`
    },
    { key: '園區地圖', value: '<a href="./hotelMap.jpg"><img src="./hotelMap.jpg" style="width: 70%; height: auto;" alt=""></a>' },
    { key: '訂房須知', value: '⚠線上預訂須事先全額匯款完成，無法使用數位五倍券、國旅券、好食券付款，請知悉<br><br>⚠請事先閱讀相關購買須知、注意事項、取消政策，預定等同於同意園區相關規定<br><br>提醒您：每筆交易的交易限額上限將調整為5萬元，<br>超過5萬元之交易，將無法於藍新付款頁面選擇Web ATM與ATM轉帳之付款方式，訂單將無法成立。請分開下訂<br><br>⚠園區僅提供匯款轉帳，暫不支援虛擬ATM使用無卡/無摺的匯款方式<br><br>訂房網址:<a href="https://bluemagpieresort.rezio.shop/zh-TW/product/Bbookingroom" target="_blank" >預定住宿</a>' },
    {
        key: '訂房取消規則', value: `
                                    所選日期前 14 天以上(5/16之前) 取消 ，全額退款 <br>
                                    所選日期前 9～13 天之間 (5/17~5/21) 取消，收取f手續費 30% <br>
                                    所選日期前 4～8 天之間 (5/22~5/26) 取消，收取手續費 50% <br>
                                    所選日期前 1～3 天之間 (5/27~5/29) 取消，收取手續費 70% <br>
                                    所選日期當天取消，無法退款 (5/30)<br><br>
                                    需扣除銀行匯費30元餘額全額退還不便之處請見諒！<br>
                                    無提供延期 ，無提供延期 ，無提供延期 <br>`
    },
    { key: '住宿說明', value: '住宿費用包含(早餐卷和入園卷)<br>入園卷會以電子憑證的方式寄送到Email信箱<br><br>附有：入園券、早餐券、洗髮精、沐浴乳、吹風機、電水壺<br>所有房型皆含有獨立衛浴、獨立冷暖氣<br>入住所有房間為現場工作人員安排，恕無法指定<br><br><strong>免費提供嬰兒床（小棉被枕頭需自行攜帶）、嬰兒澡盆、小椅凳服務需事先告知</strong><br><strong>嬰兒盥洗用品需自行攜帶、園區無消毒鍋</strong>' },
    { key: '加床加早餐說明', value: '若入住人數超過房型人數，會酌收入園券，早餐需另外加購<br><br>加床費用-乳膠床墊500元/位，含入園券及隔天早餐券1張，無床架。若有需要請提早告知現場付費即可<br><br>加購早餐：超過90公分一人200元，早餐是自助式吃到飽型式<br>但若入住人數較少，會改以每人一份早餐的型式供應(也可能會有外購早餐)' },
    { key: '重要時段及WiFi說明', value: '一般入住時間為下午3點(連假期間下午4點)，隔天11點退房！<br><br>園區門禁時間為 22:00~07:00<br>早餐時間為 08:00~09:30，逾時不再供餐<br><br>WIFI: BMRF-XXXX / 密碼：037782883' },
    {
        key: '禁止事項', value: `
                                    房間及衣櫥內嚴禁懸掛濕衣物<br><br>
                                    請勿在營區內使用高耗電之電器用品（如：電鍋、電磁爐、烤箱、咖啡機、移動式冷氣、電暖器、電視、音響、卡拉 ok…等）<br><br>
                                    露營場地內禁止直接在草地上升火烤肉、野炊 … 等，如需烤肉請自備使用離地 30 公分以上之高腳烤肉架<br><br>
                                    團體租用營地舉辦活動需另行加裝特殊音響設備(音量的大小須遵守園方的規定)、燈光、外叫餐車、餐點、烤山豬、BBQ 者，必須提前告知園區，取得園區同意方可進行，園區會酌收清潔費<br><br>`
    }
];
const titles = ['#', '名稱', '房型', '價格', '備註', '加床', '加嬰兒床'];
const info = [
    { isShow: true, name: '藍鵲會館', type: '雙人房', price: '3780', note: '住宿含入園劵2張、隔天早餐2客、洗髮精、沐浴乳、浴巾、吹風機、電水壺、冰箱（僅供冷藏）<br>最多可加一床(乳膠床墊)500元<br>若加一床皆無法再加嬰兒床，需自行評估', addBedOk: true, addInfantBedOk: false, img: './photo/first/2.jpg' },
    { isShow: true, name: '藍鵲會館', type: '四人房', price: '4320', note: '住宿含入園劵4張、隔天早餐4客、洗髮精、沐浴乳、浴巾、吹風機、電水壺、冰箱（僅供冷藏）<br>四人房部分房型為2張雙人床<br>最多可加一床(乳膠床墊)500元<br>若加一床皆無法再加嬰兒床，需自行評估', addBedOk: true, addInfantBedOk: false, img: './photo/first/4.jpg' },
    { isShow: true, name: '藍鵲會館', type: '六人房', price: '5940', note: '住宿含入園劵6張、隔天早餐6客、洗髮精、沐浴乳、浴巾、吹風機、電水壺、冰箱（僅供冷藏）<br>最多可加一床(乳膠床墊)500元<br>若加一床皆無法再加嬰兒床，需自行評估', addBedOk: true, addInfantBedOk: false, img: './photo/first/6.jpg' },
    { isShow: true, name: '藍鵲會館', type: '雙人房', price: '7200', note: '住宿含入園劵8張、隔天早餐8客、洗髮精、沐浴乳、浴巾、吹風機、電水壺、冰箱（僅供冷藏）<br>最多可加一床(乳膠床墊)500元<br>若加一床皆無法再加嬰兒床，需自行評估', addBedOk: true, addInfantBedOk: false, img: './photo/first/8.jpg' },
    { isShow: false, name: '檜意村小木屋', type: '雙人房', price: '3840', note: '住宿含入園劵2張、隔天早餐2客、洗髮精、沐浴乳、浴巾、吹風機、電水壺、冰箱（僅供冷藏）', addBedOk: null, addInfantBedOk: null, img: './photo/second/2.jpg' },
    { isShow: false, name: '檜意村小木屋', type: '四人房', price: '4640', note: '住宿含入園劵4張、隔天早餐4客、洗髮精、沐浴乳、浴巾、吹風機、電水壺、冰箱（僅供冷藏）', addBedOk: null, addInfantBedOk: null, img: './photo/second/4.jpg' },
    { isShow: false, name: '檜意村小木屋', type: '八人房', price: '7920', note: '住宿含入園劵8張、隔天早餐8客、洗髮精、沐浴乳、浴巾、吹風機、電水壺、冰箱（僅供冷藏）', addBedOk: null, addInfantBedOk: null, img: './photo/second/8.jpg' },
    { isShow: false, name: '移動城堡-露營車', type: '2大2小', price: '4640', note: '適合2大2小，1雙人床(寬126cm，適合1大1小)<br>或是1上下舖(適合1大1小，上舖限重 40kg內)<br>每台露營車都有木棧平台，亦有獨立衛浴及小客廳<br>衛浴請使用露營車旁附加客廳、獨立衛浴<br>住宿含入園劵4張、隔天早餐4客、洗髮精、沐浴乳、浴巾、吹風機、電水壺、冰箱（僅供冷藏）', addBedOk: false, addInfantBedOk: false, img: './photo/other/movingCastle.jpg' },
    { isShow: false, name: '合掌村', type: '雙人房', price: '3780', note: '合掌村主要房型為雙人房，四人房為房內加兩張單人乳膠床墊<br>僅提供 2 - 4 人入住，不提供額外加床服務<br>住宿含入園劵、隔天早餐、洗髮精、沐浴乳、浴巾、吹風機、電水壺、冰箱（僅供冷藏）', addBedOk: false, addInfantBedOk: false, img: './photo/other/closepalm.jpg' },
    { isShow: false, name: '星空城堡-露營車', type: '四人房', price: '6120', note: '可入住4位， 住宿費用包含入園劵4張、隔天早餐4客、洗髮精、沐浴乳、浴巾、吹風機、電水壺、冰箱（僅供冷藏）<br>提供一張標準雙人床及單人床上下舖<br>', addBedOk: true, addInfantBedOk: false, img: './photo/other/start.jpg' },
    { isShow: false, name: '星光村', type: '雙人房', price: '4320', note: ' 星光村主要房型為雙人房，四人房會在房內加兩張單人乳膠床墊，僅提供 2 - 4 人入住，不提供額外加床服務<br>住宿含入園劵、隔天早餐券、洗髮精、沐浴乳、浴巾、吹風機、電水壺、冰箱（僅供冷藏）', addBedOk: true, addInfantBedOk: false, img: './photo/other/startLight.jpg' },
];


const scheduleInfo = [
    {
        "day": 1,
        "time": "14:00 - 15:30",
        "name": "集合與入住",
        "url": "https://www.google.com/maps/place/%E8%97%8D%E9%B5%B2%E6%B8%A1%E5%81%87%E8%8E%8A%E5%9C%92/data=!4m2!3m1!1s0x0:0x1084edfcb9d75e04?sa=X&ved=1t:2428&ictx=111",
        "urlName": "導航-藍鵲渡假莊園"
    },
    {
        "day": 1,
        "time": "15:30 - 17:00",
        "name": "通霄精鹽廠體驗",
        "url": "https://www.google.com.tw/maps/place/%E8%87%BA%E9%B9%BD%E9%80%9A%E9%9C%84%E8%A7%80%E5%85%89%E5%9C%92%E5%8D%80+(%E8%87%BA%E9%B9%BD%E9%80%9A%E9%9C%84%E7%B2%BE%E9%B9%BD%E5%BB%A0)/@24.5559693,120.7010003,17z/data=!3m1!4b1!4m6!3m5!1s0x3469a6244dbce847:0xcb06400333f06dfe!8m2!3d24.5559644!4d120.7035752!16s%2Fg%2F12lk_zhg2?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D",
        "urlName": "導航-通霄精鹽廠"
    },
    {
        "day": 1,
        "time": "17:30 - 19:00",
        "name": "晚餐 - 新海樓餐廳",
        "url": "https://www.google.com.tw/maps/place/%E6%96%B0%E6%B5%B7%E6%A8%93%E9%A4%90%E5%BB%B3/@24.5504205,120.6975144,17z/data=!4m14!1m7!3m6!1s0x3469a6244dbce847:0xcb06400333f06dfe!2z6Ie66bm96YCa6ZyE6KeA5YWJ5ZyS5Y2AICjoh7rpub3pgJrpnITnsr7pub3lu6Ap!8m2!3d24.5559644!4d120.7035752!16s%2Fg%2F12lk_zhg2!3m5!1s0x3469a61f74e916fd:0xdfa8f38047e83155!8m2!3d24.5504205!4d120.6975144!16s%2Fg%2F1thmhr1k?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D",
        "urlName": "導航-新海樓餐廳"
    },
    {
        "day": 1,
        "time": "19:30 - 22:00",
        "name": "羅以晚會",
        "url": "https://www.google.com/maps/place/%E8%97%8D%E9%B5%B2%E6%B8%A1%E5%81%87%E8%8E%8A%E5%9C%92/data=!4m2!3m1!1s0x0:0x1084edfcb9d75e04?sa=X&ved=1t:2428&ictx=111",
        "urlName": "導航-藍鵲渡假莊園"
    },
    {
        "day": 1,
        "time": "22:30",
        "name": "休息",
        "url": "",
        "urlName": "藍鵲渡假莊園"
    },
    {
        "day": 2,
        "time": "07:30 - 09:00",
        "name": "早餐-附設肯芙咖啡廳",
        "url": "",
        "urlName": "藍鵲渡假莊園"
    },
    {
        "day": 2,
        "time": "09:00 - 11:30",
        "name": "蘭草文化館DIY",
        "url": "https://www.google.com/maps/place/%E8%97%BA%E8%8D%89%E6%96%87%E5%8C%96%E9%A4%A8/@24.4144019,120.6830481,17z/data=!3m1!4b1!4m6!3m5!1s0x34690f2555555555:0xad4355002924d70c!8m2!3d24.414397!4d120.685623!16s%2Fg%2F1pzq4rtdj?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D",
        "urlName": "導航-蘭草文化館DIY"
    },

    {
        "day": 2,
        "time": "11:30 - 14:00",
        "name": "午餐 - 便所麵",
        "url": "https://www.google.com/maps/place/%E4%BE%BF%E6%89%80%E9%BA%B5/data=!4m2!3m1!1s0x0:0x3555fc42d311d1d1?sa=X&ved=1t:2428&ictx=111",
        "urlName": "導航-便所麵"
    },
    {
        "day": 2,
        "time": "14:30 - 16:30",
        "name": "出水沙灘海景散步",
        "url": "https://www.google.com/maps/place/%E5%87%BA%E6%B0%B4%E6%B2%99%E7%81%98(%E6%B2%99%E6%BC%A0)%E9%80%9A%E9%9C%84%E5%8D%97/@24.4515406,120.6395728,17z/data=!4m6!3m5!1s0x3469095780a22dd9:0xa7f38b8bc385a32c!8m2!3d24.4505127!4d120.6382022!16s%2Fg%2F11kr35s162?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D",
        "urlName": "導航-出水沙灘"
    },
    {
        "day": 2,
        "time": "17:00 - 18:30",
        "name": "晚餐 - 海口魷魚羹麵店",
        "url": "https://www.google.com.tw/maps/place/%E6%B5%B7%E5%8F%A3%E9%AD%B7%E9%AD%9A%E7%BE%B9%E9%BA%B5%E5%BA%97/@24.4460459,120.6350291,17z/data=!3m1!4b1!4m6!3m5!1s0x346909fe1073b47d:0x3646297ce83fe95b!8m2!3d24.446041!4d120.637604!16s%2Fg%2F11gh6bdc7c?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D",
        "urlName": "導航-海口魷魚羹"
    },
    {
        "day": 2,
        "time": "18:30~",
        "name": "賦歸",
        "url": "https://www.google.com.tw/maps/place/%E8%87%BA%E7%81%A3%E5%9F%BA%E7%9D%A3%E9%95%B7%E8%80%81%E6%95%99%E6%9C%83+%E5%8D%97%E5%B4%81%E6%95%99%E6%9C%83/@25.0464856,121.2910898,17z/data=!3m1!4b1!4m6!3m5!1s0x34681fd88600a053:0x40c59e34a66e3ab0!8m2!3d25.0464808!4d121.2936647!16s%2Fg%2F1pzrw3l7j?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D",
        "urlName": "導航-南崁教會"
    }
];


window.onload = () => {
    setContent('currentDate', [''], 'date')
    setContent('accordionExample', accordionData, 'basic')
    setContent('titlesTD1', titles, 'tableHead')
    setContent('titlesTD2', titles, 'tableHead')
    setContent('titlesTD3', titles, 'tableHead')
    setContent('infos1', info.filter(i => i.name === '藍鵲會館'), 'tableInfo')
    setContent('infos2', info.filter(i => i.name === '檜意村小木屋'), 'tableInfo')
    setContent('infos3', info.filter(i => i.name !== '檜意村小木屋' && i.name !== '藍鵲會館'), 'tableInfo')
    setContent('schedule1', scheduleInfo.filter(i => i.day === 1), 'schedule')
    setContent('schedule2', scheduleInfo.filter(i => i.day === 2), 'schedule')
}

