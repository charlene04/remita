function productManager(){
    location.href = "/admin/products";
}

function home() {
    location.href = "/"
}

function userManager(){
    location.href = "/admin/users"
}
function clearCartNow() {
    localStorage.clear();
    getStorage()
}

function checkoutManager(){
    location.href = "/admin/checkouts"
}
$('.open-sidebar').click(function(){
    $('.sidebar').show('slow');
    $('.open-sidebar').hide('slow');
    
});
$('.close-sidebar').click(function(){
    $('.sidebar').hide('slow');
    $('.open-sidebar').show('slow');
    
});

function category(value){
    location.href = `/shop/category/${value}`
}
function shop(){
    location.href = "/shop"
}
function login(){
    location.href = "/auth/login"
}
function register(){
    location.href = "/auth/signup"
}

setTimeout(function(){
    document.getElementsByClassName("alert")[0].style.display = 'none'
}, 3000)

let email = document.getElementById("profile").textContent
const sub = email.split('@')
document.getElementById("profile").textContent = sub[0]



function addToStorage(item){
    let devcampstores;
    if(localStorage.getItem('devcampstores') === null){
        devcampstores = [];
    }else{
        devcampstores = JSON.parse(localStorage.getItem('devcampstores'));
    }
    devcampstores.push(JSON.parse(item));
    if(devcampstores.length > 0){
        let num = document.getElementById("cart_num")
        num.style.backgroundColor = "red";
        num.textContent = devcampstores.length
    }
    
    localStorage.setItem('devcampstores', JSON.stringify(devcampstores));
}

function getStorage(){
    let devcampstores;
    if(localStorage.getItem('devcampstores') === null){
        devcampstores = [];
    }else{
        devcampstores = JSON.parse(localStorage.getItem('devcampstores'));
    }
    if(devcampstores.length > 0){
        num = document.getElementById("cart_num")
        num.style.backgroundColor = "red";
        num.textContent = devcampstores.length
    }else{
        num.style.backgroundColor = "transparent";
        num.textContent = '';
    }
}
getStorage()

   
    
    