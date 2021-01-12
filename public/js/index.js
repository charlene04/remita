function productManager(){
    location.href = "/admin/products";
}

function home() {
    location.href = "/"
}

function userManager(){
    location.href = "/admin/users"
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


   
    
    