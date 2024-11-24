const openModal = (id) => {
    const send = document.querySelector('#' + id);
    send.setAttribute("style", "display:block");
  }

  const closeModal = (id) => {
    const send = document.querySelector('#' + id);
    send.setAttribute("style", "display:none");
  }