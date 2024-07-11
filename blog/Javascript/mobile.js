
function readmenu(callback){
    fetch("../Javascript/menu.json")
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function xuatmenu(data){
    let list = document.querySelector(".header__navbar--list");
    html =`<li class=" exit header__navbar--list-item"><a href="#"><i class="fa-regular fa-circle-xmark"></i></a></li>`;
    for( let m of data){
        html += `<li class="header__navbar--list-item"><a href="${m.link}">${m.modal}</a></li>`
    }
    list.innerHTML = html;
    list.classList.remove("none");
    list.classList.toggle("block");

    let exit = document.querySelector(".exit");
    exit.onclick =function(){
        list.classList.remove("block");
        list.classList.add("none");
    }
}

function startmenu(){
    readmenu(xuatmenu);
}
