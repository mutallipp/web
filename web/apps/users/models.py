from django.db import models
from datetime import datetime
from django.contrib.auth.models import AbstractUser


# class Usersinfo(AbstractUser):
#     # # password=models.CharField(max_length=50)
#     nick_name=models.CharField(max_length=50,null=True,blank=True)
#     phone=models.CharField(max_length=11)
#     key=models.CharField(max_length=100,null=True,blank=True)
#     dy_url=models.CharField(max_length=200,null=True,blank=True)
#     add_time=models.DateTimeField(default=datetime.now)
#     # link_url=models.ForeignKey('Links',related_name='links' , on_delete=models.CASCADE,null=True,blank=True)
#
#     def __str__(self):
#         return self.username



class Usersinfo(models.Model):
    username=models.CharField(max_length=50)
    password=models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    nick_name=models.CharField(max_length=50,null=True,blank=True)
    phone=models.CharField(max_length=11)
    key=models.CharField(max_length=100,null=True,blank=True)
    is_active=models.BooleanField(default=False)
    dy_url=models.CharField(max_length=200,null=True,blank=True)
    code_image = models.FileField(upload_to='img',null=True,blank=True)
    add_time=models.DateTimeField(default=datetime.now)
    last_login=models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.username

    class Meta:
        verbose_name = '电影会员'
        verbose_name_plural = verbose_name


# 邮箱验证
class EmailVerifyRecord(models.Model):
    code = models.CharField(max_length=20)
    email = models.CharField(max_length=50)
    send_type = models.CharField(max_length=20,choices=(('register','注册'),('forget','找回')))
    send_time = models.DateTimeField(default=datetime.now)

    class Meta:
        verbose_name ='邮箱验证码'
        verbose_name_plural=verbose_name







