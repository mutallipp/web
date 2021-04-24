$(document).ready(function(){
	$("[id^=pitexs]").each(function(){
		switchimg($(this).attr("id"));
	})
})
function switchimg(dcid){
	var arr=new Array("http://i1.fuimg.com/576364/9311bac08c4015e6.jpg","http://i2.tiimg.com/576364/c8f164b6be8535de.jpg","http://i2.tiimg.com/576364/0c6ed50462768ad0.jpg","http://i1.fuimg.com/576364/4c331cb73321f897.jpg","http://i2.tiimg.com/576364/173c08a3e8c1e144.jpg","http://i2.tiimg.com/576364/0ac194d1950fd05a.jpg");
    var arr1=new Array("https://m.emeixs.com/Dwz/index/id/NEwy2","https://c33111.818tu.com/referrals/index/3575698","https://c33111.818tu.com/referrals/index/3575679","https://c33111.818tu.com/referrals/index/3681649","https://m.emeixs.com/Dwz/index/id/xV76P","https://m.zzhydw.com/Dwz/index/id/47DV");
    var arr2=new Array("璞ǘ澶╀环鏂板鎴�","鍦扮嫳璇℃帰","鍏ラ鎯呭€哄叡缂犵坏","楝煎悰缂犵坏缁曟寚鏌�","涓€澶滄矇娌�","楝煎鐖变笂鎴�");
	var x=Math.random();
  	var pitexs=parseInt(x*arr2.length);
	var url=arr1[pitexs];
	var img=arr[pitexs];
	var txt=arr2[pitexs];
	$("#"+dcid+" a").attr("href",url);
	$("#"+dcid+" a ").attr("data-original",img);
	$("#"+dcid+" a h4").text(txt);
}