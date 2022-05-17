
function toast(msg) {
    Toastify({
        text: msg,
        duration: 2200,
        newWindow: true,
        close: false,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            boxShadow: "none"

        }
    }).showToast();
}

window.document.oncontextmenu = new Function("return false"); window.document.onselectstart = new Function("return false"); window.document.ondragstart = new Function("return false");

