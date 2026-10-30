// =====================================
// 4. READING PROGRESS BAR
// =====================================

const progressBar = document.createElement("div");

progressBar.id = "progressBar";

progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "5px";
progressBar.style.width = "0%";
progressBar.style.backgroundColor = "#A75F68";
progressBar.style.zIndex = "9999";
progressBar.style.transition = "width 0.1s ease";

document.body.appendChild(progressBar);

function updateProgressBar() {
    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    if (pageHeight > 0) {
        const progress = (scrollTop / pageHeight) * 100;
        progressBar.style.width = progress + "%";
    } else {
        progressBar.style.width = "100%";
    }
}

window.addEventListener("scroll", updateProgressBar);
window.addEventListener("resize", updateProgressBar);

updateProgressBar();
