# 文件名 ：forms
# 日期 ：2018/12/12 16:41
# author: Murallip
from django import forms


class Card_image(forms.Form):
    image=forms.FileField(required=False)
    number=forms.ImageField(required=False)