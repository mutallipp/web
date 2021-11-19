# 文件名 ：forms
# 日期 ：2018/11/4 20:25
# author: Murallip
from django import forms
from captcha.fields import CaptchaField


class LoginForm(forms.Form):
    # username=forms.CharField(required=True,error_messages={'required': "用户名不能为空"})
    username=forms.CharField(required=True,error_messages={'required': "用户名不能为空"})
    password=forms.CharField(required=True,error_messages={'required': "密码不能为空"})





class RegisterForm(forms.Form):
    password = forms.CharField(required=True,  error_messages={'required': "密码不能为空"})
    repassword = forms.CharField(required=True, error_messages={'required': "密码不能为空"})
    username = forms.CharField(required=True, error_messages={'required': "用户名不能为空"})
    phone=forms.CharField(required=True,min_length=11,error_messages={'required': "手机号不能为空"})
    email=forms.CharField(required=True,error_messages={'required': "邮箱不能为空"})
    captcha=CaptchaField(error_messages={'invalid': "验证码错误"})


class Dy_url(forms.Form):
    url = forms.CharField(required=True, error_messages={'required': "不能提交空地址"})


class Code_image(forms.Form):
    code_image=forms.FileField(required=False)