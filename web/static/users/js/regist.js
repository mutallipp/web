/**
 * Created by Mutallip on 2018/11/10.
 * 注册业务逻辑
 */


var regist={
    check:function () {
    //    获取登录页面的用户名和密码
        var username=$('input[name="username"]').val();
        var phone=$('input[name="phone"]').val();
        var email=$('input[name="email"]').val();
        var password=$('input[name="password"]').val();
        var repassword=$('input[name="repassword"]').val();
        var captcha_0 = document.getElementById("id_captcha_0").value;
        var captcha_1=$('input[name="captcha_1"]').val();
        console.log(captcha_0);
        if(!username){
            dialog.error('用户名不能为空')
        }
        else if(!password){
            dialog.error('密码不能为空')
        }
        else if(!phone){
            dialog.error('手机不能为空')
        }
        else if(phone.length<11){
            dialog.error('手机号格式错误')
        }
        else if(!email){
            dialog.error('邮箱不能为空')
        }
        else if(repassword!=password){
            dialog.error('两次密码不一致')
        }
        else if(!captcha_1){
            dialog.error('验证码不能为空')
        }
        else {
    //    执行异步请求 $.post
        var url='/users/regist/';
        var data={
            'username':username,
            'password':password,
            'repassword':repassword,
            'phone':phone,
            'email':email,
            'captcha_1':captcha_1,
            'captcha_0':captcha_0


        };
        $.post(url,data,function (result) {
             // var result = JSON.parse(data);
            console.log(result)
            if(result.status==1){
                return dialog.success(result.message,url='/users/login/');
            }
            else if(result.status==0){
                return dialog.error(result.message)
            }else if(result.status==2){
                //form错误信息
                if(result.message.captcha[0]){
                    return dialog.error('验证码错误')
                }else {
                    return dialog.error(result.message)
                }
            }
        })
    }
    }
};

