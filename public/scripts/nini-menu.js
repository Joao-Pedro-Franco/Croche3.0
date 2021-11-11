const openNav = document.querySelector("#a-nav")
const sideNav = document.querySelector("#nav-bar")
const themeButton = document.querySelector("#themeButton")
const cssRoot = document.documentElement.style

const content = document.querySelector("#content")

let nav_bar = false;
let theme = false;

main_theme = `
--nav-color: rgb(209, 243, 253);
--background-color: rgb(250, 255, 212);
--content-color1: #fde7e8;
--content-color2: #fc6065;
--hr-color: rgba(255, 68, 68, 0.37);
--border-color: #bb484c;
--text-color: rgb(105, 105, 105);
--shadow-color: rgba(128, 128, 128, 0.37);
`
dark_theme = `
--nav-color: rgb(59, 59, 59);
--background-color: rgb(19, 19, 19);
--content-color1: rgb(59, 59, 59);
--content-color2: #535353;
--hr-color: rgba(0, 0, 0, 0.37);
--border-color: #222222;
--text-color: rgb(255, 255, 255);
--shadow-color: rgba(0, 0, 0, 0.705);
`


openNav.addEventListener('click', function () {
    if (nav_bar == false) {
        sideNav.classList.add("active");
        content.classList.add("active");
        nav_bar = true;
    }
    else {
        sideNav.classList.remove("active");
        content.classList.remove("active");
        nav_bar = false;
    }
})


themeButton.addEventListener('click', () => {
    if (theme == false) {
        const cssRoot = document.documentElement.style.cssText = dark_theme
        theme = true
    }
    else {
        const cssRoot = document.documentElement.style.cssText = main_theme
        theme = false
    }
})
