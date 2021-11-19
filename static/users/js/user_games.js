/**
 * Created by Mutallip on 2018/11/10.
 * user_games的业务逻辑
 */

var user_games = {
    check: function () {
        //    获取登录页面的用户名和密码
        var formData = new FormData();
        formData.append("code_image", $('#input_face')[0].files[0]);
        if (!formData) {
            dialog.error('用户名不能为空')
        }
        else {
            //    执行异步请求 $.post
            var url = '/users/games/';
            var data = {
                'code_image': formData
            };
            $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
// 告诉jQuery不要去处理发送的数据
                    processData: false,
// 告诉jQuery不要去设置Content-Type请求头
                    contentType: false,
                    dataType: "json",
                    success: function (result) {
                        console.log(result)
                        if (result.status == 1) {
                            return dialog.success(result.message, url = '/users/games/');
                        }
                        else if (result.status == 0) {
                            return dialog.error(result.message)
                        } else if (result.status == 2) {
                            //form错误信息
                            if (result.message.captcha[0]) {
                                return dialog.error('验证码错误')
                            } else {
                                return dialog.error(result.message)
                            }
                        }

                    }
                }
            )
        }
    }

};