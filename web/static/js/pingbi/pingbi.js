<script type="text/javascript">
    var system ={}; 
    var p = navigator.platform;      
    system.win = p.indexOf("Win") == 0; 
    system.mac = p.indexOf("Mac") == 0; 
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);    
    if(system.win||system.mac||system.xll){
      alert('ئۈندىدارنىڭ ئىچىدە ئېچىڭ！');
	var opened = window.open('about:blank', '_self');
        opened.opener = null;
        opened.close();
    }

</script>
{#检测是否微信浏览器#}
    <script type="text/javascript">
        // 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
        var useragent = navigator.userAgent;
        if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
            // 这里警告框会阻塞当前页面继续加载
            alert('请在微信里面打开');
            // 以下代码是用javascript强行关闭当前页面
            var opened = window.open('https://mp.weixin.qq.com/s/Lp1BYCzBVRdmPid7UAd_8A', '_self');
            opened.opener = null;
            opened.close();
        }
    </script>