from django.db import models
from datetime import datetime
# Create your models here.


class Member(models.Model):
    SEX_CHOICES=(('nan','男'),('nv','女'),('weizhi','未知'))
    nickname = models.CharField(max_length=100)                     # 微信名称
    phone = models.CharField(max_length=11,null=True,blank=True)   #手机号
    sex = models.CharField(null=True, blank=True, max_length=5)                                    # 性别
    avatar = models.ImageField(max_length=200)                       # 头像
    salt = models.CharField(max_length=32,null=True, blank=True)                           # 市
    city = models.CharField(max_length=32,null=True, blank=True)                          # 省
    country = models.CharField(max_length=32,null=True, blank=True)                       #国家
    reg_ip = models.CharField(max_length=100,null=True,blank=True)
    switch = models.BooleanField(default=False)                         #状态
    name=models.CharField(max_length=100,null=True,blank=True)                           # 姓名
    number = models.CharField(max_length=30,null=True,blank=True)    # 学号
    school=models.CharField(max_length=100,null=True,blank=True)                         # 学校
    openid = models.CharField(max_length=80,null=True,blank=True)
    token = models.CharField(max_length=150,null=True,blank=True)
    formid = models.CharField(max_length=150,null=True,blank=True)
    updated_time = models.DateTimeField(auto_now=True)
    created_time = models.DateTimeField(auto_now_add=True)



    def __str__(self):
        return self.nickname


class BindMember(models.Model):
    member_id= models.IntegerField()                                # 绑定的用户id
    token = models.CharField(max_length=150,null=True,blank=True)
    openid = models.CharField(max_length=80)
    # phone = models.CharField(max_length=11, null=True, blank=True)  # 手机号
    updated_time = models.DateTimeField(auto_now=True)
    created_time = models.DateTimeField(auto_now_add=True)



    def __str__(self):
        return self.member_id

class Card(models.Model):
    user_id = models.CharField(max_length=32, null=True, blank=True)        # 上传一卡通的用户的id
    card_number = models.CharField(max_length=32, null=True, blank=True)    # 学号
    image = models.FileField(upload_to='card_image',null=True,blank=True)          # 一卡通照片
    status=models.BooleanField(default=True)
    updated_time = models.DateTimeField(auto_now=True)
    # created_time = models.DateTimeField(default=datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    created_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.card_number


class AccessToken(models.Model):
    expires_in = models.IntegerField()
    access_token=models.CharField(max_length=800)


if __name__ == '__main__':
    print(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))