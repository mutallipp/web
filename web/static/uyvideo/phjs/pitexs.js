$(document).ready(function(){
	$("[id^=pitexs]").each(function(){
		switchimg($(this).attr("id"));
	})
})
function switchimg(dcid){
	var arr=new Array("http://i1.fuimg.com/576364/9311bac08c4015e6.jpg","http://i2.tiimg.com/576364/c8f164b6be8535de.jpg","http://i2.tiimg.com/576364/0c6ed50462768ad0.jpg","http://i1.fuimg.com/576364/4c331cb73321f897.jpg","http://i2.tiimg.com/576364/173c08a3e8c1e144.jpg","http://i2.tiimg.com/576364/0ac194d1950fd05a.jpg");
    var arr1=new Array("https://m.emeixs.com/Dwz/index/id/NEwy2","https://c33111.818tu.com/referrals/index/3575698","https://c33111.818tu.com/referrals/index/3575679","https://c33111.818tu.com/referrals/index/3681649","https://m.emeixs.com/Dwz/index/id/xV76P","https://m.zzhydw.com/Dwz/index/id/47DV");
    var arr2=new Array("豪娶天价新妻我","地狱诡探","入骨情债共缠绵","鬼君缠绵绕指柔","一夜沉沦","鬼妻爱上我");
	var x=Math.random();
  	var pitexs=parseInt(x*arr2.length);  
	var url=arr1[pitexs];
	var img=arr[pitexs];
	var txt=arr2[pitexs]; 
	$("#"+dcid+" a").attr("href",url);
	$("#"+dcid+" a ").attr("data-original",img);
	$("#"+dcid+" a h4").text(txt);
}