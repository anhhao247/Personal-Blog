
function login(){
    var signinForm = document.querySelector(".header__end--sign-in");
    signinForm.onclick = function(){
        var logninForm = document.querySelector(".modal_login");
        logninForm.style.display = 'flex';
    }
}
function dangnhapuser(){
    getUser(data => {
        hanldelLogin(data);
    })
}
function DangKiuser(){
    getUser(data1 => {
        hanldelCreateModal(data1);
    })
}
var apiuser = "  http://localhost:3000/user";

function getUser(callback){
    fetch(apiuser).then(function(response){
        return response.json();
    })
    .then(callback);
}
function hanldelLogin(data){
    var email = document.getElementById("email_dn");
    var password = document.getElementById('password').value;
    let e = checkEmail(email);
    let dem = 0;
    for (let d of data){
        if(e===true && d.email === email.value &&d.password === password){
            dem = 1;
            alert("Đăng Nhập Thành Công");
            var modal = document.querySelector(".modal_login");
            modal.style.display = 'none';
        }
    }
    if(dem === 0) alert("Đăng Nhập Không thành Công \n Hãy kiểm tra lại mật Khẩu của bạn ");
}
function hanldelCreateModal(data1){
    var email = document.getElementById('email_dk');
    var pw1 = document.getElementById("password1");
    var pw2 = document.getElementById('password2');
    let check = checkEmail(email);
    let dem = 0;
    console.log(data1);
    if(check === true){
        if(pw1.value === pw2.value){
            for(let d of data1){
                if(d.email === email.value){
                    alert("Email của bạn đã được đăng kí ");
                    dem = 1;
                    break;
                }
            }
            var user = {
                email : email.value,
                password : pw1.value
            }
            if(dem===0) {
                CreateUser(user);
                alert("Đăng kí tài Khoản thành công \n");
            }
        }

    }
}
function CreateUser(data, callback){
    var option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data),
    }
   fetch(apiuser, option)
    .then(function(){
        return response.json();
    })
    .then(callback)
}
function ChangeModal(){
    var registerForm = document.querySelector(".modal_register");
    var logninForm = document.querySelector(".modal_login");
        if(logninForm.style.display === 'none'){
            registerForm.style.display = 'none';
            logninForm.style.display = 'flex';
        }else {
            logninForm.style.display = 'none';
            registerForm.style.display = 'flex';
        }
    
}

function NoneModal(){
    var registerForm = document.querySelector(".modal_register");
    var logninForm = document.querySelector(".modal_login");
    let modal = document.querySelector(".modal");
    modal.style.display = 'none';
    if(logninForm.style.display === 'none'){
        registerForm.style.display = 'none';
    }else {
        logninForm.style.display = 'none';
    }
}
function checkEmail(email) { 
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if (!filter.test(email.value)) { 
             alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
             email.focus; 
             return false; 
    }
    return true;
} 

function scrolled(){
    var menu = document.querySelector('.app');
        window.addEventListener("scroll", function() {
            var scrollPosition = window.scrollY;
            var gototop = document.getElementById("gototop");
            if (scrollPosition > 150) {
              menu.classList.add("fixed");
              gototop.style.display = 'block';
            } 
            if(scrollPosition=== 0){
                gototop.style.display = 'none';
                menu.classList.remove("fixed");
            }
    });
}
var mode = localStorage.getItem("LightMode")
window.onload = function(){
    scrolled();
    

    if(mode === 'light'){
     var x = document.querySelector("body")
      x.classList.add("light-mode")
    var moon = document.getElementById("light-theme")

      moon.classList.remove("fa-sun")
        moon.classList.add("fa-moon")

}
}

function goToTop() {
    var timer = setInterval(function() {
        document.documentElement.scrollTop -= 10;

        if(document.documentElement.scrollTop <= 0) {
            clearInterval(timer);
        }
    }, 1);
}


// console.log('hello')

function light() {
    document.body.classList.toggle("light-mode")
    var moon = document.getElementById("light-theme")
    moon.classList.toggle("fa-moon")
    moon.classList.toggle("fa-sun")
    if(document.body.classList.contains("light-mode")){
        localStorage.setItem("LightMode", "light")
    }
    else{
        localStorage.setItem("LightMode", "dark")

    }
} 


