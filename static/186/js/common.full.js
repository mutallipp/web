define(function (require, exports, module) {

    $('img.lazyload').lazyload({
        data_attribute:'src',
        threshold:30,
    });

    $('.top_search_btn').click(function(){
        $('.searchPop').addClass('popShow');
		$('body').animate({ scrollTop: 0 }, 200);
    });
    $('.cancelInput').click(function(){
        $('.searchPop').removeClass('popShow');
    });

    // app专享链接地址处理
    if($('.app_zx_url').length > 0){
        if(/iphone|ipod/i.test(navigator.userAgent)){
            $('.channel_banner').each(function(k, e){
                $(this).click(function(){
                    var click = $(this).attr('data-click');
                    if(click){
                        _dct_(click + '_ios');
                    }else{
                        _dct_('mys_main_medium_ad_'+(k+1)+'_ios');
                    }
                });
            });
            $('.app_zx_url').each(function(k, e){
                var ios = $(this).attr('data-ios');
                $(this).attr('href', ios);
            });
        }else{
            $('.channel_banner').each(function(k, e){
                $(this).click(function(){
                    var click = $(this).attr('data-click');
                    if(click){
                        _dct_(click + '_android');
                    }else{
                        _dct_('mys_main_medium_ad_'+(k+1)+'_android');
                    }
                });
            });
            $('.app_zx_url').each(function(k, e){
                var apk = $(this).attr('data-apk');
                $(this).attr('href', apk);
            });
        }
    }
	function toggleChannel () {
        //aChannelShow
        $('.top_channel_btn').click(function () {
            if($(this).hasClass("aChannelShow")){
                $(this).removeClass("aChannelShow");
				$(".headerChannelList").css("display","none");
            }else{
                $(this).addClass("aChannelShow");
				$(".headerChannelList").css("display","block");
            }
        });
    }
	toggleChannel();

	var config=[["/",'zy'],["/",'dsj'],['/','dm'],['/','dy'],['/','main']];
	var host=window.location.href;
	var module_click="main";
	for(var i in config){
		if(host.indexOf(config[i][0])>=0){
			module_click=config[i][1];
			break;
		}
	}

	require('sildeFocusPlugin');
    $("#focus").sildeFocusPlugin({
        speed:10,
        conClassName:"focusList",
        tabClassName:"focusTab"
    });

    if(/iphone|ipod/i.test(navigator.userAgent)){
        if($('#app_recommend_box').find('#appRecommended_ios').length>0){
            $("#appRecommended_ios .recommendedList a").each(function(k, e){
                $(this).click(function(){
                    _dct_('mys_'+module_click+'_yytj_'+(k+1)+'_ios');
                });
            });
            $('#app_recommend_box').show();
			if($("#appRecommended_ios .notSlide").length > 0){
				$("#appRecommended_ios").show();
			}else{
				$("#appRecommended_ios").show().sildeFocusPlugin({
					speed:10,
					conClassName:"recommendedList",
					tabClassName:"pRecommendedTab"
				});
			}
        }
    }else{
        if($('#app_recommend_box').find('#appRecommended_apk').length>0){
            $("#appRecommended_apk .recommendedList a").each(function(k, e){
                $(this).click(function(){
                    _dct_('mys_'+module_click+'_yytj_'+(k+1)+'_android');
                });
            });
            $('#app_recommend_box').show();
			if($("#appRecommended_apk .notSlide").length > 0){
				$("#appRecommended_apk").show();
			}else{
				$("#appRecommended_apk").show().sildeFocusPlugin({
					speed:10,
					conClassName:"recommendedList",
					tabClassName:"pRecommendedTab"
				});
			}
        }
    }

});