$(function(){

//椤堕儴涓汉淇℃伅
		$(".shopbox").hide();
	$(".class-list").click(function(){
		$(".shopbox").slideToggle();
	});
	$(".shopbox li").hover(function(){
		$(".shopbox li.hover").removeClass("hover")
		$(this).addClass("hover");
	}, function () {
		$(this).removeClass("hover")
	});
	$(".shopbox li").click(function () {

		$(".class-list").text($(this).text());
		$("#ShopClass").val($(this).text());
		$(".shopbox").hide();
	});
});