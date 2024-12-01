let startPoint = 0;
let endPoint = 0;
let dragLength = 5;

const openImageView = (pageNo) => {
  document.body.setAttribute("style", "touch-action: pan-y; background: rgb(53, 54, 58); overflow-y: hidden");
  changeGalleryDetailPage(pageNo);
  openModal("imageViewer");
}

const closeImageView = () => {
  document.body.setAttribute("style", "touch-action: pan-y; background: rgb(53, 54, 58);");
  closeModal("imageViewer");
}

const changeGalleryPageText = (pageNumber) => {
  document.querySelector(".gallery-number-area").innerText = `${pad(pageNumber, 2)} / ${pageSize-1}`;
}

const changeGalleryPage = (pageNo) => {
  if(pageNo === 0){
    pageNo = 2;
  }
  else if(pageNo === 3){
    pageNo = 1;
  }

  const xPos = 0 + (galleryWidth) * (pageNo-1);
  document.querySelector(".gallery").setAttribute("style", `transition: -webkit-transform 500ms ease 0s; transform: translate3d(-${xPos}px, 0px, 0px); width: ${galleryWidth * 2}px;`);

  let dots = Array.from(document.querySelector('.slick-dots').children);
  for(var i=0; i<dots.length; i++){
    if(i === pageNo-1){
      dots[i].classList.add('slick-active');
    }
    else{
      dots[i].classList.remove('slick-active');
    }
  }
}

const changeGalleryDetailPage = (pageNo) => {
  let sumWidth = detailWidth * (pageSize+1);
  if(pageNo === 1){
    const xPos = 0 + detailWidth * (pageNo);
    document.querySelector(".gallery-detail").setAttribute("style", `transition: -webkit-transform 500ms ease 0s; transform: translate3d(-${xPos}px, 0px, 0px); width: ${sumWidth}px;`);
  }
  else if(pageNo < 1){
    const xPos = 0 + detailWidth * (pageNo);
    const tempXPos = 0 + detailWidth * (pageSize);
    document.querySelector(".gallery-detail").setAttribute("style", `transition: -webkit-transform 500ms ease 0s; transform: translate3d(-${xPos}px, 0px, 0px); width: ${sumWidth}px;`);
    
    setTimeout(() => {
      document.querySelector(".gallery-detail").setAttribute("style", `transform: translate3d(-${tempXPos}px, 0px, 0px); width: ${sumWidth}px;`);
    }, 500);
  }
  else if(pageNo > pageSize){
    const tempXPos = 0;
    document.querySelector(".gallery-detail").setAttribute("style", `transform: translate3d(-${tempXPos}px, 0px, 0px); width: ${sumWidth}px;`);
    
    setTimeout(changeGalleryDetailPage, 10, 1);
  }
  else{
    const xPos = 0 + detailWidth * (pageNo);
    document.querySelector(".gallery-detail").setAttribute("style", `transition: -webkit-transform 500ms ease 0s; transform: translate3d(-${xPos}px, 0px, 0px); width: ${sumWidth}px;`);
  }
}

const prevPage = () => {
  const styleString = document.querySelector(".gallery").getAttribute("style");
  const nowXPos = Number(styleString.split("translate3d(-")[1].split("px")[0]);
  const nextXPos = nowXPos - galleryWidth;
  const nextPageNo = nextXPos / galleryWidth;

  changeGalleryPage(nextPageNo + 1);
}

const nextPage = () => {
  const styleString = document.querySelector(".gallery").getAttribute("style");
  const nowXPos = Number(styleString.split("translate3d(-")[1].split("px")[0]);
  const nextXPos = nowXPos + galleryWidth;
  const nextPageNo = nextXPos / galleryWidth;

  changeGalleryPage(nextPageNo + 1);
}

const prevDetailPage = () => {
  const styleString = document.querySelector(".gallery-detail").getAttribute("style");
  const nowXPos = Number(styleString.split("translate3d(-")[1].split("px")[0]);
  const nextXPos = nowXPos - detailWidth;
  const nextPageNo = nextXPos / detailWidth;

  changeGalleryDetailPage(nextPageNo);
  changeGalleryPage(Math.ceil(nextPageNo/9));
}

const nextDetailPage = () => {
  const styleString = document.querySelector(".gallery-detail").getAttribute("style");
  const nowXPos = Number(styleString.split("translate3d(-")[1].split("px")[0]);
  const nextXPos = nowXPos + detailWidth;

  const nextPageNo = nextXPos / detailWidth;
  changeGalleryDetailPage(nextPageNo);
  changeGalleryPage(Math.ceil(nextPageNo/9));
}

function setDragLength(sensitivity){
  dragLength = sensitivity;
}

const addSwipeEvent = (slide) => {
  const splitPath = slide.querySelector("img").src.split("/");
  const pageNo = Number(splitPath[splitPath.length - 1].split(".")[0]);

  if(isMobile()){
    slide.addEventListener("touchstart", (e) => {
      startPoint = e.touches[0].pageX;
    });

    slide.addEventListener("touchend", (e) => {
      endPoint = e.changedTouches[0].pageX;
      if (endPoint - startPoint > dragLength) {
        prevPage();
      } else if (startPoint - endPoint > dragLength) {
        nextPage();
      }
    });
  }
  else{
    // PC 클릭 이벤트 (드래그)
    slide.addEventListener("mousedown", (e) => {
      startPoint = e.pageX;
    });

    slide.addEventListener("mouseup", (e) => {
      endPoint = e.pageX;
      if (endPoint - startPoint > dragLength) {
        prevPage();
      } else if (startPoint - endPoint > dragLength) {
        nextPage();
      }
    });
  }
}

const addSwipeDetailEvent = (slide) => {
  const splitPath = slide.querySelector("img").src.split("/");
  const pageNo = Number(splitPath[splitPath.length - 1].split(".")[0]);

  if(isMobile()){
    slide.addEventListener('click', () => {
      openImageView(pageNo);
    });

    slide.addEventListener("touchstart", (e) => {
      startPoint = e.touches[0].pageX;
    });

    slide.addEventListener("touchend", (e) => {
      endPoint = e.changedTouches[0].pageX;
      if (endPoint - startPoint > dragLength) {
        prevDetailPage();
      } else if (startPoint - endPoint > dragLength) {
        nextDetailPage();
      }
    });
  }
  else{
    // PC 클릭 이벤트 (드래그)
    slide.addEventListener("mousedown", (e) => {
      startPoint = e.pageX;
    });

    slide.addEventListener("mouseup", (e) => {
      endPoint = e.pageX;
      if (endPoint - startPoint > dragLength) {
        prevDetailPage();
      } else if (startPoint - endPoint > dragLength) {
        nextDetailPage();
      } else {
        openImageView(pageNo);
      }
    });
  }
}

function addSwipeEventAll(galleryWidth, detailWidth, pageSize){
  document.querySelector(".gallery").setAttribute("style", `transition: -webkit-transform 500ms ease 0s; transform: translate3d(-0px, 0px, 0px); width: ${(galleryWidth) * (pageSize)}px;`);
  document.querySelectorAll('.gallery > .slick-slide').forEach(
      item => {
      item.setAttribute("style", `outline: none; width: ${galleryWidth}px;`);
      addSwipeEvent(item);
      }
  )

  document.querySelectorAll(".gallery-detail > .slick-slide").forEach(
      item => {
      item.setAttribute("style", `outline: none; width: ${detailWidth}px;`);
      addSwipeDetailEvent(item);
      }
  )
}

function addOpenDetail(){
  document.querySelectorAll(".gallery-item").forEach(
    item => {
      const splitPath = item.querySelector("img").src.split("/");
      const pageNo = Number(splitPath[splitPath.length - 1].split(".")[0]);

      item.addEventListener('click', () => {
        openImageView(pageNo);
      });
    }
  )
}