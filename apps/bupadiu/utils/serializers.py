# 文件名 ：serializers
# 日期 ：2018/11/10 22:55
# author: Murallip
from rest_framework import serializers
from index.models import Video
from bupadiu.models import Member,BindMember,Card


class LitleprogramSerializer(serializers.ModelSerializer):
    # ModelSerializer和Django中ModelForm功能相似
    # Serializer和Django中Form功能相似
    class Meta:
        model = Video
        # 和"__all__"等价
        fields = ('title', 'content', 'url_image', 'video_url', 'cover','tag','time')

class BemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Member
        # 和"__all__"等价
        fields = ('nickname', 'mobile', 'sex', 'city', 'country','name','number','school','openid','updated_time','created_time')


class BinBemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = BindMember
        # 和"__all__"等价
        fields = ('member_id', 'token', 'openid', 'mobile', 'updated_time', 'created_time')


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        # 和"__all__"等价
        fields = '__all__'