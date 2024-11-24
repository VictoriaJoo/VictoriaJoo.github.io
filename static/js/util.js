const pad = (n, width) => {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

const copy = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => {
        toastr.success("복사되었습니다.");
        });
}

const isMobile = () => {
    const user = navigator.userAgent;
    return user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1;
}