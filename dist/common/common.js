
$(function(){
	//头部菜单
	$('.search-bar>a:last-child>i:last-child').on('click',function(evt){
		if($(evt.target).attr('click') != "search-content"){
			$('.' + $(evt.target).attr('click')).toggleClass('item-hidden');
			if($(evt.target).hasClass('fa-search')){
	            $('.inp-control')[0].focus();
	        }else{
	            if ($('.cover')[0]) {
	                $('.cover').remove();
	            }else{
	                $('body').append('<div class="cover"></div>');
	                $('.cover').on('click',function(){
	                    $('.cover').remove();
	                    $('.'+$(evt.target).attr('click')).toggleClass('item-hidden');
	                })
	            }
	        }
		}    
	});
});
// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);