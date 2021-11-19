# 文件名 ：serializers
# 日期 ：2018/11/10 16:02
# author: Murallip
from rest_framework import serializers
from users.models import Usersinfo

class MeiziSerializer(serializers.ModelSerializer):
    # ModelSerializer和Django中ModelForm功能相似
    # Serializer和Django中Form功能相似
    class Meta:
        model = Usersinfo
        # 和"__all__"等价
        fields = ('username', 'password', 'email', 'phone', 'add_time')