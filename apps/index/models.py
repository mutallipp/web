from django.db import models
from faker import Factory  	#faker做假数据的库
from datetime import datetime

class Video(models.Model):
	title = models.CharField(null=True,blank=True,max_length=100)	# 电影名字
	type = models.CharField(null=True,blank=True,max_length=20)		# 电影的类型
	director = models.CharField(null=True,blank=True,max_length=70)	# 导演
	actors = models.CharField(null=True,blank=True,max_length=150)		#演员
	area = models.CharField(null=True,blank=True,max_length=150)		# 地区
	suzuk = models.CharField(null=True,blank=True,max_length=10)		# 清晰度
	content = models.TextField(null=True, blank=True)					# 介绍
	url_image = models.URLField(null=True,blank=True)					#图片地址
	video_url = models.URLField(null=True,blank=True)					# 电影地址
	cover = models.FileField(upload_to='cover_image',null=True,blank=True) #自己上传图片
	TAG_CHOICES = (
		('wei', 'Wei'),
		('han', 'Han'),
	)
	views = models.PositiveIntegerField('浏览量', default=0)
	tag = models.CharField(null=True, blank=True, max_length=5, choices=TAG_CHOICES) #语言
	update_time=models.DateTimeField(auto_now=True)
	create_time=models.DateTimeField(auto_now_add=True)


	def __str__(self):
		return self.title

	class Meta:
		verbose_name = '电影'
		verbose_name_plural = verbose_name

