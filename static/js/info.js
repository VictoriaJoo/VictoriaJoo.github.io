function setInfo(info){
    
}

function putLeftDay(weddingDate){
    const today = new Date;
    const leftDay = Math.ceil((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    document.querySelector("#leftDay").innerText = `${leftDay}`;
}