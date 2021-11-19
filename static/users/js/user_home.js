/**
 * Created by Mutallip on 2018/11/10.
 * user页面的逻辑
 */

var user_home={
    check:function () {
    //    获取登录页面的用户名和密码
        var url=$('input[name="url"]').val();

        if(!url){
            dialog.error('地址不能为空')
        }
        else {
    //    执行异步请求 $.post
        var url_='/users/user/';
        var data={
            'url':url
        };
        $.post(url_,data,function (result) {
             // var result = JSON.parse(data);
            console.log(result)
            if(result.status==1){
                return dialog.success(result.message,url='/users/user/');
            }
            else if(result.status==0){
                return dialog.error(result.message)
            }else if(result.status==3){
                //form错误信息
                return dialog.redirect(result.message,'/users/login/')
                return null
            }
            else if(result.status==2){
                return dialog.error(result.message)
            }
        })
    }
    }
};