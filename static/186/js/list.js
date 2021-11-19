/**
* 列表页交叉筛选滚动
*/
var scrollObj = new Array();
var scrollTags = {
	opt:{
		hScroll: true, //水平滚动
		vScroll: false, //垂直滚动
		bounce : true,
		momentum: true
	},
	init:function(_id){
		if(!$('#'+_id)[0]){
			return;
		}
		if($('.selectList').css('display') != 'none'){
			// 设置宽度
			var width = $('#'+_id+' p').width()+50;
			$('#'+_id+' .con').css({'width':width});
		}
		scrollObj[_id] = this.makeScroll(_id, this.opt);
		$(window).on('resize',function(){
			if($('.selectList').css('display') != 'none'){
				$('#'+_id+' .con').css({'width':$('#'+_id+' p').width()+50});
			}
			scrollObj[_id].refresh();
			resizeImg();
		});

		$('.selectList a.cur').each(function(k, e){
			if(!$('#'+_id+' a.cur')[0]){
				return;
			}

			var screenWidth = $('.header').width();
			var aLeft = $('#'+_id+' a.cur').offset().left;
			var aWidth = $('#'+_id+' a.cur').width();
			var scrollLeft = parseInt(screenWidth - aLeft);
			if(scrollLeft < 30){
				scrollObj[_id].scrollTo(-aLeft + aWidth);
			}
		});
		return scrollObj[_id];
	},
	makeScroll:function(_id, _opt){
		return new iScroll(_id, _opt);
	}
};
scrollTags.init('first_list');
scrollTags.init('second_list');
scrollTags.init('third_list');

// 频道页推荐与片库切换
var switchTab = {
	init: function(){
		var self = this;
		self.bindSwitch();
		self.resizeImg();
		$(window).on('resize',function(){
			self.resizeImg();
		});
	},
	resizeImg: function(){
		var width= $('#hot_cont').width();
		width = parseInt(width*0.307);
		height = parseInt(260*(width/195));
		$('.list_imgs img').css({'width':width, 'height':height});
		$('.list_imgs a').css({'width':width, 'height':height});
	},
	bindSwitch: function(){
		if(!$('#list_tab')[0]){
			return;
		}
		var self = this;
		$('#list_tab a').each(function(k, e){
			$(e).click(function(){
				$('#list_tab a').removeClass('cur');
				$(this).addClass('cur');
				if(k==0){
					$('#list_cont_select,#list_cont_box').hide();
					$('.focus')[0] && $('.focus').show();
					$('#hot_cont').show();
					self.resizeImg();
				}else{
					$('#hot_cont').hide();
					$('.focus')[0] && $('.focus').hide();
					$('#list_cont_select,#list_cont_box').show();
					sliderTimeout && clearTimeout(sliderTimeout);
					resizeImg();

					// 重置或绑定筛选菜单
					!scrollObj['first_list'] && scrollTags.init('first_list');
					!scrollObj['second_list'] && scrollTags.init('second_list');
					!scrollObj['third_list'] && scrollTags.init('third_list');
					for(var i in scrollObj){
						var width = $('#'+i+' p').width()+50;
						$('#'+i+' .con').css({'width':width});
						scrollObj[i].refresh();
					}
				}
			});
		});
	}
};
switchTab.init();

$('.selectBtn').click(function(){
	if($(this).hasClass('cur') && !$(this).parent().hasClass('fixed')){
		$('.selectBtn').removeClass('cur');
		$('.selectList').hide();
	}else{
		$('.selectList').show();
		$('.selectBtn').addClass('cur');
		$('.selectList p').each(function(k, e){
			$(this).parent().css({'width':$(this).width()});
		});
		!scrollObj['first_list'] && scrollTags.init('first_list');
		!scrollObj['second_list'] && scrollTags.init('second_list');
		!scrollObj['third_list'] && scrollTags.init('third_list');
		for(var i in scrollObj){
			scrollObj[i].refresh();
		}
	}

	if($(this).parent().hasClass('fixed')){
		scroll(0,0);
	}
});

$('.selectList a,.pList a').click(function(){
	if($(this).parent().hasClass('pList')){
		scroll(0,0);
	}else{
		$('#actors').attr({'data-param':''});
	}
	if($(this).attr('data-clear')){
		var clear = $(this).attr('data-clear');
		if(clear == 'all'){
			$('.selectList a').removeClass('cur');
			$('#first_list a').first().addClass('cur');
			$('#second_list a').first().addClass('cur');
		}
		if(clear != 'all'){
			$('#'+clear+' a').removeClass('cur');
			$('#'+clear+' a').first().addClass('cur');
		}
	}
	$($(this).parent()).children().removeClass('cur');

	$(this).addClass('cur');
	if($(this).parent().hasClass('pList')){
		var indexOf = $(this).index();
		$('.pList a').removeClass('cur');
		$($('.pList a')[indexOf]).addClass('cur');
		$($('.pList a')[indexOf+3]).addClass('cur');
	}
	scrollMore.isScrolled = 1;

	var url = createUrl();
	var seoUrl = dealSeoUrl.parseUrl();
	var refererCookie = 'm_list_referer=' + escape(seoUrl);
	refererCookie += ';path=/;domain=.2345.com;';
	document.cookie = refererCookie;

	$('#page_more').parent().hide();
	$('#data_list').hide();
	$('#noneData').hide();
	$('#listLoading').show();
	$.ajax({
		'type':'get',
		'url': url,
		'data':{'is_ajax':1},
		'success':function(json){
			$('#page_more').attr('data-url', url);
			$('#data_list').html('');
			$('#listLoading').hide();
			if(json){
				var _json = eval('('+json+')');
				var _html = createHtml(_json['movie_data'], _json['type']);
				$('#data_list').html(_html);
				$('#page_more').attr('data-total', _json['page_num']);
				if(_json['page_num']>1){
					$('#page_more').attr('data-page', 2);
					scrollMore.isScrolled = 0;
					$('#page_more').parent().show();
				}
				$('#data_list').show();

			}else{
				$('#noneData').show();
			}
			resizeImg();
		},
		'error':function(){

		}
	});
});

/**
* 生成seo链接
*/
var dealSeoUrl = {
	 parseUrl: function(){
		var url = $('.selectList').attr('data-url'), media = '';
		if(url.indexOf('ctl=list') !== -1){
			media = 'dy';
		}else if(url.indexOf('ctl=tv') !== -1){
			media = 'tv';
		}else if(url.indexOf('ctl=anime') !== -1){
			media = 'dm';
		}else if(url.indexOf('ctl=zongyi') !== -1){
			media = 'zy';
		}
		var tagsArr = new Array();
		$('.selectList .cur').each(function(){
			tagsArr.push($(this).attr('data-param'));
		});
		url += '&'+tagsArr.join('&');

		var orderArr = new Array();
		$('#tab .cur').each(function(){
			orderArr.push($(this).attr('data-param'));
		});
		url += '&'+orderArr.join('&');

		if($('#actors')[0]){
			var actors = $('#actors').attr('data-param');
			url += '&'+actors;
		}

		var urlArr = url.split('&');
		var paramArr = new Array();
		for(var i in urlArr){
			if(i>0 && urlArr[i].indexOf('=') !== -1){
				var tmpArr = urlArr[i].split('=');
				if(tmpArr[1]){
					paramArr[tmpArr[0]] = tmpArr[1];
				}
			}
		}

		var seoUrl = '';
		switch(media){
			case 'dy':
				seoUrl = this.createDyUrl(paramArr);
				break;
			case 'tv':
				seoUrl = this.createTvUrl(paramArr);
				break;
			case 'dm':
				seoUrl = this.createDmUrl(paramArr);
				break;
			case 'zy':
				seoUrl = this.createZyUrl(paramArr);
				break;
		}
		return seoUrl;
	},
	createDyUrl: function(paramArr){
		//list/aiqing-xianggang---2013--.html
		var seoUrl = [];
		seoUrl.push('http://dianying.2345.com/m/list/');
		if(paramArr['cate']){
			seoUrl.push(paramArr['cate']+'-');
		}else{
			seoUrl.push('-');
		}

		if(paramArr['province']){
			seoUrl.push(paramArr['province']+'-');
		}else{
			seoUrl.push('-');
		}
		seoUrl.push('-');
		if(paramArr['actor']){
			seoUrl.push(paramArr['actor']+'-');
		}else{
			seoUrl.push('-');
		}

		if(paramArr['year']){
			seoUrl.push(paramArr['year']+'-');
		}else{
			seoUrl.push('-');
		}
		seoUrl.push('-.html');
		return seoUrl.join('');
	},
	createTvUrl: function(paramArr){
		//yanqing-dalu--2013.html
		var seoUrl = [];
		seoUrl.push('http://tv.2345.com/m/');
		if(paramArr['cate']){
			seoUrl.push(paramArr['cate']+'-');
		}else{
			seoUrl.push('-');
		}

		if(paramArr['province']){
			seoUrl.push(paramArr['province']+'-');
		}else{
			seoUrl.push('-');
		}
		if(paramArr['actor']){
			seoUrl.push(paramArr['actor']+'-');
		}else{
			seoUrl.push('-');
		}

		if(paramArr['year']){
			seoUrl.push(paramArr['year']);
		}
		seoUrl.push('.html');
		return seoUrl.join('');
	},
	createDmUrl: function(paramArr){
		//ltlxshaoer/dqriben/nd2013/
		var seoUrl = [];
		seoUrl.push('http://dongman.2345.com/m');

		if(paramArr['cate']){
			seoUrl.push('/ltlx'+paramArr['cate']);

			if(!paramArr['year'] && !paramArr['province']){
				seoUrl.push('/');
			}
		}
		var prefix = '';
		if(!paramArr['cate']){
			prefix = 'lt';
		}
		if(paramArr['province']){
			seoUrl.push('/'+prefix+'dq'+paramArr['province']);

			if(!paramArr['year']){
				seoUrl.push('/');
			}
		}
		if(paramArr['province']){
			prefix = '';
		}
		if(paramArr['year']){
			seoUrl.push('/'+prefix+'nd'+paramArr['year']+'/');
		}
		return seoUrl.join('');
	},
	createZyUrl: function(paramArr){
		//zongyi/llxqinggan/dqgangtai/
		var seoUrl = [];
		seoUrl.push('http://v.2345.com/zongyi/m');
		if(paramArr['station']){
			seoUrl.push('/ldt'+paramArr['station']+'/');
		}else{
			if(paramArr['cate']){
				seoUrl.push('/llx'+paramArr['cate']);
				if(!paramArr['province']){
					seoUrl.push('/');
				}
			}
			var prefix = '';
			if(!paramArr['cate']){
				prefix = 'l';
			}
			if(paramArr['province']){
				seoUrl.push('/'+prefix+'dq'+paramArr['province']+'/');
			}
		}
		return seoUrl.join('');
	}
};


/**
* 生成ajax链接
*/
function createUrl(){
	var url = $('.selectList').attr('data-url');
	var tagsArr = new Array();
	$('.selectList .cur').each(function(){
		tagsArr.push($(this).attr('data-param'));
	});
	url += '&'+tagsArr.join('&');

	var orderArr = new Array();
	$('#tab .cur').each(function(){
		orderArr.push($(this).attr('data-param'));
	});
	url += '&'+orderArr.join('&');

	if($('#actors')[0]){
		var actors = $('#actors').attr('data-param');
		url += '&'+actors;
	}
	return url;
}

/**
* 生成ajax数据
*/
function createHtml(_json, _type){
	if(!_json){
		return;
	}
	var content = $.cookie('m_list_referer');
	if(content){
		var matchs = content.match(/(\w*)\-(\w*)\-{2,3}(\d*)/i);
	}
	var typeList = '';
	if(content && matchs != 'undefined' && matchs != null){
		for(var i=1;i<=3;i++){
			if(matchs[i]){
				typeList += '_' + matchs[i];
			}
		}
	}
	var _html = new Array();
	for(var i in _json){
		_html.push('<li><div class="con">');
		_html.push('<a onclick="_dct_(\'m_list_'+_type+typeList+'_'+_json[i]['id']+'\');" href="'+_json[i]['xqurl']+'" target="_self">');
		_html.push('<img src="'+_json[i]['img']+'" onerror="this.src=\'http://imgwx4.2345.com/dypcimg/mversion/pic/default.png\'">');
		if(_json[i]['score']){
			_html.push('<span class="sNum"><em class="emScore">'+_json[i]['score']+'</em>\u5206</span>');
		}else if(_json[i]['latests']){
			_html.push('<span class="sNum">'+_json[i]['latests']+'</span>');
		}
		_html.push('<span class="sTit">'+_json[i]['short_title']+'</span>');
		if(_json[i]['is_preview'] == 1){
			_html.push('<i class="trailersIcon"></i>');
		}
		_html.push('</a></div></li>');
	}
	return _html.join('');
}
 $('#data_list img').lazyload({
	data_attribute:'src',
	threshold:30
 });

/**
* 重置图片尺寸
*/
function resizeImg(){
	var width= $('#data_list').width();
	height = $('#data_list').height();
	width = parseInt(width*0.31999);
	height = parseInt(260*(width/195));
	$('#data_list img').css({'width':width, 'height':height});
	$('#data_list a').css({'width':width, 'height':height});
}
resizeImg();

/**
 * 列表页下一页效果
 */
var pageMore = {
	pageTotal:0,
	init:function(ele){
		this.pageTotal = $(ele).attr('data-total');
		$(ele).click(function(){pageMore.nextPage(ele)});
	},
	nextPage:function(ele){
		scrollMore.isScrolled = 1;

		var _page = $(ele).attr('data-page');
		if(!_page){
			return false;
		}

		$(ele).parent().hide();
		$('#loading_more').show();
		var url = createUrl();
		$.ajax({
			'url':url,
			'data':{'page':_page,'is_ajax':1},
			'type':'get',
			'charset':'gb2312',
			'success':function(json){
				if(json){
					var _json = eval('('+json+')');
					var _html = createHtml(_json['movie_data'], _json['type']);
					var pageTotal = _json['page_num'];
					$('#loading_more').hide();
					$('#data_list').append(_html);
					resizeImg();
					var pageNext = parseInt(_page)+1;
					if(pageNext <= pageTotal){
						$(ele).attr('data-page', pageNext);
						if(pageNext % 6 > 0){
							scrollMore.isScrolled = 0;
						}else{
							$(ele).parent().show();
						}
					}else{
						$(ele).parent().hide();
					}
				}else{
					$(ele).parent().hide();
				}
			}
		});
	}
};
if($('#page_more')){
	pageMore.init('#page_more');
}

// 下拉取得数据
var scrollMore = {
	isScrolled:0,
	init: function(){
		if(!$('#page_more')[0]){
			return;
		}
		this.bindScroll($('#page_more'));
	},
	bindScroll: function(_ele){
		$(window).scroll(function(){
			if(!$('#list_tab a').eq(1).hasClass('cur')){
				return;
			}
			var pageTotal = parseInt($('#page_more').attr('data-total'));
			var pageNow = parseInt($('#page_more').attr('data-page'));

			var scrollTop = $(this).scrollTop();
			var scrollHeight = $('.wrapper').height() - scrollTop - $(document).height();
			if(scrollHeight <= 30 && !scrollMore.isScrolled && pageTotal >= pageNow){
				pageMore.nextPage(_ele);
			}
		});
		return;
	}
};
scrollMore.init();


(function(){

	function device(){
		var ua = navigator.userAgent;
		if(ua.match(/iP(ad|hone|od)/i)){
			return 'ios';
		}
		else if(ua.match(/android/i)){
			return 'android';
		}
	}
	var con='.android';
	if(device()=='ios'){
		con='.ios';
		 $("#recommendedCon .android").remove();
	}else{
		$("#recommendedCon .ios").remove();
	}
var recommendedCon = $("#recommendedCon"),recommendList = $("#recommendedCon "+con+" .ulRecommended"),recommendedTab = $("#recommendedCon  .recommendedTab i"),recommendListLength = recommendList.length;
	window.onload = window.onresize = setFocusHeight;
	if(!$("#recommendedCon "+con+"  .ulRecommended")[0]){
		return ;
	}
	$("#mod_yydh").css('display','block');
	function setFocusHeight(){
		$("#recommendedCon  .recommendedTab i").remove();
		var html='';
		for(var i=0;i<recommendListLength;i++){
			if(i==0){
				html+='<i class="cur">&bull;</i>';
			}else{
				html+='<i>&bull;</i>';
			}
		}
		if(recommendListLength>1){
			$("#recommendedCon  .recommendedTab").html(html);
		}

		recommendedTab = $("#recommendedCon  .recommendedTab i");

		recommendedCon.height("auto");
		recommendedCon.children().eq(0).height(Math.round(recommendList.eq(0).height()));
	}


	var timeId;
	function recommendedFocus(){
		var showIndex = 0, hideIndex = recommendListLength - 1,moveStyle = "left",playing = false;

		var startTouchX = endTouchX = 0;
		var nextStart=false;
		var moveY = 0;

		function touchstart(event){
			nextStart=false;
			startTouchX = event.touches[0].pageX;
			moveY = event.touches[0].pageY;
		}
		function touchmove(event){
			if(Math.abs(event.touches[0].pageY - moveY) < 8){
				event.preventDefault();
			}
			endTouchX = event.touches[0].pageX;
			nextStart=true;
		}
		function touchend(event){
			if(nextStart==true){
				if(endTouchX > (startTouchX + 30)){
					// 反向滑动
					prev();
				}else if((endTouchX + 30) < startTouchX){
					// 正向滑动
					next();
				}
			}
		}

		document.getElementById("recommendedCon").addEventListener('touchstart', touchstart,false);
		document.getElementById("recommendedCon").addEventListener('touchmove', touchmove,false);
		document.getElementById("recommendedCon").addEventListener('touchend', touchend,false);

		function next(){
			if(!playing){
				moveStyle = "left";
				hideIndex = showIndex;
				showIndex++;
				if(showIndex >= recommendListLength){
					showIndex = 0;
				}
				move();
			}
		}

		function prev(){
			if(!playing){
				moveStyle = "right";
				hideIndex = showIndex;
				showIndex--;
				if(showIndex < 0){
					showIndex = recommendListLength - 1;
				}
				move();
			}
		}

		function move(){
			playing = true;
			if(moveStyle == "left"){
				recommendList.eq(hideIndex).css({"z-index":12}).animate({
				  left: "-100%"
				},500,'ease-out',function(){
					playing = false;
				});
				recommendList.eq(showIndex).css({"z-index":15,"left":"100%"}).animate({
				  left: 0
				},500,'ease-out',function(){
					$.each($(recommendList.eq(showIndex)).find('img'), function(i, item){
						var src = $(item).attr('data-src');
						if(src!=''){
							$(item).attr('src',src);
							$(item).attr('data-src','');
						}
					});

				});
			}else if(moveStyle == "right"){
				recommendList.eq(hideIndex).css({"z-index":12}).animate({
				  left: "100%"
				},500,'ease-out',function(){
					playing = false;
				});
				recommendList.eq(showIndex).css({"z-index":15,"left":"-100%"}).animate({
				  left: 0
				},500,'ease-out',function(){
					$.each($(recommendList.eq(showIndex)).find('img'), function(i, item){
						var src = $(item).attr('data-src');
						if(src!=''){
							$(item).attr('src',src);
							$(item).attr('data-src','');
						}
					});
				});
			}
			recommendedTab.removeClass("cur");
			recommendedTab.eq(showIndex).addClass("cur");
		}

		function startAutoPlay(){
			clearInterval(timeId);
			timeId = setInterval(next,10000);
		}

		function stopAutoPlay(){
			clearInterval(timeId);
		}

		function init(){
			move();
		}

		startAutoPlay();
		init();
		$("#list_tab").find('a').eq(1).bind('click',function(){
				stopAutoPlay();
			});

		$("#list_tab").find('a').eq(0).bind('click',function(){
				setTimeout(function(){
					recommendedCon.height("auto");
					recommendedCon.children().eq(0).height(Math.round(recommendList.eq(0).height()));
					startAutoPlay();

					init();
					clearInterval(timeId);
					playing = false;
					timeId=setInterval(function(){
						next();
					},10000);

				},500);
			});


	}
	setTimeout(function(){
		setFocusHeight();
		if(recommendListLength>1){
			recommendedFocus();
		}
	},800);
})();