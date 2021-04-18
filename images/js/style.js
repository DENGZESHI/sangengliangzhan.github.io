
window.addEventListener('load',function(){
    var nav = document.querySelector(".nav");
    var footer = document.querySelector(".footer");
    var content = document.querySelector(".content");
    nav.onclick = function () {
         /* console.log(nav.offsetHeight);
        console.log(document.body.clientHeight);
        console.log(footer.offsetHeight); */
    }
    var c_width = document.body.clientHeight - nav.offsetHeight -footer.offsetHeight;
    content.style.height = c_width + 'px';
   /*  console.log(content.offsetHeight); */
    
});