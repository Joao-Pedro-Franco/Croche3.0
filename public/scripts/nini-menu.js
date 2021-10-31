const openNav = document.querySelector("#a-nav")
const sideNav = document.querySelector("#nav-bar")
const navMenu = document.querySelector("#nav-menu")
const navCont = document.querySelector("#nav-contador")

const content = document.querySelector("#content")



let nav_bar = false;

openNav.addEventListener('click', function(){
    if(nav_bar == false){
        sideNav.classList.add("active");
        content.classList.add("active");
        nav_bar = true;
    }
    else{
        sideNav.classList.remove("active");
        content.classList.remove("active");
        nav_bar = false;
    }
})


