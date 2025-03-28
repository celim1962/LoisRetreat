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
                       <a target="_blank" href="${item.img}"> <img src="${item.img}" width="98%" style="border-radius:5px" /></a>
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




const titles = ['#', '名稱', '房型', '價格', '備註', '加床', '加嬰兒床'];





const changeMode = (status) => {
    let obj = document.styleSheets[2]
    let temp = ['table-dark', 'thead-dark']

    switch (status) {
        case 'light':
            temp.map(t => {
                document.querySelectorAll('.' + t).forEach(function (el) {
                    el.classList.replace(t, t + 'aa')
                });
            })
            obj.disabled = true;
            break;
        case 'dark':
            temp.map(t => {
                document.querySelectorAll('.' + t + 'aa').forEach(function (el) {
                    el.classList.replace(t + 'aa', t)
                });
            })
            obj.disabled = false;
            break;
    }
}

const prints = () => {
    let obj = document.styleSheets[2]
    obj.disabled = true;

    changeMode('light')

    window.print();

    changeMode('dark')

}

const getData = async (name) => {
    let res = await fetch('./data.json')
    res = await res.json()
    return res[`${name}`]
}


window.onload = async () => {
    const accordionData = await getData('basicInfo');
    const info = await getData('roomInfo');
    const scheduleInfo = await getData('scheduleData');

    setContent('currentDate', [''], 'date');
    setContent('accordionExample', accordionData, 'basic');
    setContent('titlesTD1', titles, 'tableHead');
    setContent('titlesTD2', titles, 'tableHead');
    setContent('titlesTD3', titles, 'tableHead');
    setContent('infos1', info.filter(i => i.name === '藍鵲會館'), 'tableInfo');
    setContent('infos2', info.filter(i => i.name === '檜意村小木屋'), 'tableInfo');
    setContent('infos3', info.filter(i => i.name !== '檜意村小木屋' && i.name !== '藍鵲會館'), 'tableInfo');
    setContent('schedule1', scheduleInfo.filter(i => i.day === 1), 'schedule');
    setContent('schedule2', scheduleInfo.filter(i => i.day === 2), 'schedule');
    getData('scheduleData')
}

