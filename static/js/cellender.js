function createDateTd(nowDate, nowDay, targetDate){
    let textColorNo =  '1';
    if(nowDate === targetDate.getDate()){
        textColorNo = '1 !text-white';
    }
    else if(nowDay === 0){
        textColorNo = '2';
    }

    let td = document.createElement('td');
    td.setAttribute('class', 'section-calendar-area-6 pad');

    let div1 = document.createElement('div');
    div1.setAttribute('class', 'section-calendar-area-7 cal-size-2 relative flex flex-col items-center justify-center');
    td.appendChild(div1);

    let div2 = document.createElement('div');
    div2.setAttribute('class', `dayday flex justify-center items-center text-base z-10 cal-text-${textColorNo}`);
    div2.innerText = nowDate;
    div1.appendChild(div2);

    let fullDiv = document.createElement('div');
    fullDiv.setAttribute('class', 'absolute w-full h-full');
    div1.appendChild(fullDiv);

    if(nowDate === targetDate.getDate()){
        fullDiv.setAttribute('class', fullDiv.getAttribute('class')+' cal-heart');

        let heartTextDiv = document.createElement('div');
        heartTextDiv.setAttribute('class', 'ddayoriginal cal-sm-text absolute top-[105%] flex justify-center text-xs font-semibold tracking-normal whitespace-nowrap');
        heartTextDiv.innerText = `${targetDate.getHours() < 12 ? '오전' : '오후'} ${pad(targetDate.getHours(),2)}:${pad(targetDate.getMinutes(),2)}`;
        div1.appendChild(heartTextDiv);
    }

    return td;
}

function makeCellender(targetDate){
    document.querySelector('.section-calendar-area-1').innerText = `${targetDate.getMonth()+1}월`;

    let tbody = document.querySelector('.section-calendar-area-3').querySelector('tbody');

    let firstDate = new Date(targetDate);
    firstDate.setDate(1);
    let firstDay = firstDate.getDay();


    let lastDate = new Date(firstDate);
    lastDate.setMonth(lastDate.getMonth()+1);
    lastDate.setDate(0);

    let tr = document.createElement('tr');
    tr.setAttribute('class', 'section-calendar-area-5');

    let nowDate = 1;
    for(var i=0; i<firstDay; i++){
        tr.appendChild(document.createElement('td'));
    }
    for(var i=firstDay; i<7; i++){
        tr.appendChild(createDateTd(nowDate++, i, targetDate));
    }

    tbody.appendChild(tr);

    while(nowDate < lastDate.getDate()){
        let tr = document.createElement('tr');
        tr.setAttribute('class', 'section-calendar-area-5');

        for(var i=0; i<7 && nowDate <= lastDate.getDate(); i++){
            tr.appendChild(createDateTd(nowDate++, i, targetDate));
        }

        tbody.appendChild(tr);
    }
}