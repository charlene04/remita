function productManager(){
    location.href = "/admin/products";
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




   
    
    