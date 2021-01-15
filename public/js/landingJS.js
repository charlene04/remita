jQuery(document).ready(function($)
{
    var header = $('.header');
	var topNav = $('.top_nav')
	var mainSlider = $('.main_slider');
	var hamburger = $('.hamburger_container');
	var menu = $('.hamburger_menu');
	var menuActive = false;
	var hamburgerClose = $('.hamburger_close');
    var fsOverlay = $('.fs_menu_overlay');
    
    initFixProductBorder();
    // initIsotopeFiltering();

    function initFixProductBorder()
    {
    	if($('.product_filter').length)
    	{
			var products = $('.product_filter:visible');
    		var wdth = window.innerWidth;

    		// reset border
    		products.each(function()
    		{
    			$(this).css('border-right', 'solid 1px #e9e9e9');
    		});

    		// if window width is 991px or less

    		if(wdth < 480)
			{
				for(var i = 0; i < products.length; i++)
				{
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}

    		else if(wdth < 576)
			{
				if(products.length < 5)
				{
					var product = $(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for(var i = 1; i < products.length; i+=2)
				{
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}

    		else if(wdth < 768)
			{
				if(products.length < 5)
				{
					var product = $(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for(var i = 2; i < products.length; i+=3)
				{
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}

    		else if(wdth < 992)
			{
				if(products.length < 5)
				{
					var product = $(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for(var i = 3; i < products.length; i+=4)
				{
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}

			//if window width is larger than 991px
			else
			{
				if(products.length < 5)
				{
					var product = $(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for(var i = 4; i < products.length; i+=5)
				{
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}	
    	}
    }


	//first filtering method..(didn't work)
    function initIsotopeFiltering()
    {
    	if($('.grid_sorting_button').length)
    	{
    		$('.grid_sorting_button').click(function()
	    	{
	    		// putting border fix inside of setTimeout because of the transition duration
	    		setTimeout(function()
		        {
		        	initFixProductBorder();
		        },500);

		        $('.grid_sorting_button.active').removeClass('active');
		        $(this).addClass('active');
		 
		        var selector = $(this).attr('data-filter');
		        $('.product-grid').isotope({
		            filter: selector,
		            animationOptions: {
		                duration: 750,
		                easing: 'linear',
		                queue: false
		            }
		        });

		        
		         return false;
		    });
    	}
	}

	
	//second filtering method... still has a few kinks
	var cloneWomen = $(".women").clone();
	var cloneMen = $(".men").clone();
	var cloneAccessories = $(".accessories").clone();
	
	$('.women-select').on('click', () => {
		$('.grid_sorting_button.active').removeClass('active');
		$('.women-select').addClass('active');

		$('.women').remove();
		$('.men').remove();
		$('.accessories').remove();

		$(".product-grid").append(cloneWomen);
		$('.women').css({
			position: '',
			top: ''
		})
		$('.product-grid').css({
			display: 'flex'
		});
	} )

	$('.men-select').on('click', () => {
		$('.grid_sorting_button.active').removeClass('active');
		$('.men-select').addClass('active');

		$('.women').remove();
		$('.men').remove();
		$('.accessories').remove();

		$(".product-grid").append(cloneMen);
		$('.men').css({
			position: '',
			top: ''
		})
		$('.product-grid').css({
			display: 'flex'
		});
		
	} )

	$('.accessories-select').on('click', () => {
		$('.grid_sorting_button.active').removeClass('active');
		$('.accessories-select').addClass('active');
		$('.women').remove();
		$('.men').remove();
		$('.accessories').remove();

		$(".product-grid").append(cloneAccessories);
		$('.accessories').css({
			position: '',
			top: ''
		})
		$('.product-grid').css({
			display: 'flex'
		});
	} )

	$('.select').on('click', () => {
		$('.grid_sorting_button.active').removeClass('active');
		$('.select').addClass('active');
		$(".product-grid").append(cloneWomen);
		$(".product-grid").append(cloneMen);
		$(".product-grid").append(cloneAccessories);
	} )
	
});