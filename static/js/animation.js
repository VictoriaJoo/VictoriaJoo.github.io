const aosElems = document.querySelectorAll(".aos-init");

window.addEventListener('scroll', () => {
    aosElems.forEach(aosElem => {
        if (aosElem.getBoundingClientRect().y < 800 && !aosElem.getAttribute("class").includes("aos-animate")) {
        aosElem.setAttribute("class", aosElem.getAttribute("class") + " aos-animate");
        }
    });
});