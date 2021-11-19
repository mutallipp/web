from datetime import datetime
from django.db import models
# Create your models here.

class Radio(models.Model):
    name = models.CharField(null=True, blank=True, max_length=100)  # 名字
    radio_id = models.IntegerField(null=True, blank=True)  # 名字
    description = models.CharField(null=True, blank=True, max_length=300)  # 描述
    rType=models.CharField(null=True,blank=True,max_length=20)              #类型
    image = models.CharField(null=True, blank=True, max_length=100)  # 图片
    last_program_title = models.CharField(null=True, blank=True, max_length=100)  # 是否更新完?
    subscribe_count = models.CharField(null=True, blank=True, max_length=100,default=0)  # 浏览次数
    update_time = models.DateTimeField(auto_now=True)
    create_time = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.name


class RadioT(models.Model):
    radio_id=models.IntegerField()
    title = models.CharField(null=True, blank=True, max_length=100)  # 名字
    description = models.CharField(null=True, blank=True, max_length=300)  # 描述
    mp3 = models.CharField(null=True, blank=True, max_length=100)  # mp3
    last_program_title = models.CharField(null=True, blank=True, max_length=100)  # 是否更新完?
    views = models.CharField(null=True, blank=True, max_length=100,default=0)  # 浏览次数
    update_time = models.DateTimeField(auto_now=True)
    create_time = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.title


class Audio(models.Model):
    mp3=models.FileField(upload_to='dic/audio')