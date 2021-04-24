// 前端登录业务类

var login={
    check:function () {
    //    获取登录页面的用户名和密码
        var username=$('input[name="username"]').val();
        var password=$('input[name="password"]').val();
        if(!username){
            dialog.error('用户名不能为空')
        }
        if(!password){
            dialog.error('密码不能为空')
        }
    //    执行异步请求 $.post
        var url='/users/login/';
        var data={
            'username':username,
            'password':password

        };
        $.post(url,data,function (result) {
             // var result = JSON.parse(data);
            console.log(result)
            if(result.status==1){
                //登录成功
                return dialog.success(result.message,url='/users/user/');
            }
            else if(result.status==0){
                //登录失败
                return dialog.error(result.message)
            }else if(result.status==2){
                //form错误信息
                var ob='';
                for(var i=0;i<result.message.length;i++){
                    ob+=','+result.message[i]
                }
                return dialog.error(ob)
            }
        })
    }
};