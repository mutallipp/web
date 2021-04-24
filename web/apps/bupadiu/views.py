import json

import time
from django.shortcuts import render,HttpResponse
from django.core import serializers
from django.views.generic.base import View
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from bupadiu.models import Member,BindMember,Card
from index.models import Video
from web import settings
from bupadiu.utils.forms import Card_image
from bupadiu.utils.serializers import LitleprogramSerializer,BemberSerializer,BinBemberSerializer,CardSerializer
from bupadiu.utils.userService import UserService,MemberService,Service

import requests

# Create your views here.


class LoginView(View):
    def get(self,request):

        return HttpResponse('ok')

    def post(self,request):
        content={}
        nickname=request.POST.get('nickName')
        code=request.POST.get('code')
        avatar=request.POST.get('avatarUrl')
        sex=request.POST.get('gender')
        salt=request.POST.get('province')
        city=request.POST.get('city')
        country=request.POST.get('country')
        name=request.POST.get('name')
        number=request.POST.get('number')
        phone=request.POST.get('phone')
        school=request.POST.get('school')
        token=request.POST.get('token')
        switch=request.POST.get('switch')
        formid=request.POST.get('formId')
        print(formid)
        if switch=='true':
            switch=True
        if switch=='false':
            switch=False
        print(type(switch))
        if not token:
            openid = MemberService.getWeChatOpenId(code)
            # 没有token原因2个：1没有注册     2.把token删了。如果以前注册过但是把token删了就可以修改信息和返回给他的token
            if not openid:
                content['code'] = 0
                content['msg'] = '没获取到openid~~'
                return JsonResponse(content, safe=False)
            # openid = MemberService.getWeChatOpenId(code)
            bind_info=BindMember.objects.filter(openid=openid).first()
            print(code)
            if not bind_info :
                if is_number(number,openid):
                    content['code'] = 0
                    content['msg'] = '该卡号已存在~~'
                    return JsonResponse(content, safe=False)
                # 没有注册过
                member=Member()
                member.nickname=nickname
                if sex=='0':
                    sex='未知'
                elif sex=='1':
                    sex='男'
                else:
                    sex='女'
                member.sex=sex
                member.avatar=avatar
                member.salt=salt
                member.city=city
                member.country=country
                member.name=name
                member.number=number
                member.phone=phone
                member.school=school
                member.openid=openid
                member.switch=switch
                member.formid=formid
                member.token=''
                member.save()

                token = "%s#%s" % (UserService.geneAuthCode(member), member.id)
                model_bind=BindMember()
                model_bind.member_id=member.id
                model_bind.openid=openid
                # model_bind.phone=phone
                model_bind.token=token
                model_bind.save()
                content['data']={'nickname':nickname}
                content['token']=token
                content['code'] =200
                content['msg'] ='用户保存成功~~'
                return JsonResponse(content,safe=False)

            else:
                # 用户把token删了,那就可以修改信息，并且返回给他自己的token
                content=set_user_info(bind_info, name, number, phone, school, nickname,switch,formid)
                return JsonResponse(content,safe=False)
        else:
#             有token就不需要拿到openid
            bind_info = BindMember.objects.filter(token=token).first()
            if not bind_info:
#                 不能存在有两种原因  1自己把token修改了
                openid = MemberService.getWeChatOpenId(code)
                bind_info = BindMember.objects.filter(openid=openid).first()
                if bind_info:
                    content=set_user_info(bind_info, name, number, phone, school, nickname,switch,formid)
                    return JsonResponse(content, safe=False)
                else:
                    # 没有注册过
                    if is_number(number,openid):
                        content['code'] = 0
                        content['msg'] = '该卡号已存在~~'
                        return JsonResponse(content, safe=False)
                    member = Member()
                    member.nickname = nickname
                    if sex == '0':
                        sex = '未知'
                    elif sex == '1':
                        sex = '男'
                    else:
                        sex = '女'
                    member.sex = sex
                    member.avatar = avatar
                    member.salt = salt
                    member.city = city
                    member.country = country
                    member.name = name
                    member.number = number
                    member.phone = phone
                    member.school = school
                    member.openid = openid
                    member.switch = switch
                    member.formid = formid
                    member.token = ''
                    member.save()

                    token = "%s#%s" % (UserService.geneAuthCode(member), member.id)
                    model_bind = BindMember()
                    model_bind.member_id = member.id
                    model_bind.openid = openid
                    # model_bind.phone=phone
                    model_bind.token = token
                    model_bind.save()
                    content['data'] = {'nickname': nickname}
                    content['token'] = token
                    content['code'] = 200
                    content['msg'] = '用户保存成功~~'
                    return JsonResponse(content, safe=False)
            else:
                content = set_user_info(bind_info, name, number, phone, school, nickname,switch,formid)
                return JsonResponse(content, safe=False)



class Loginchek(View):
    def get(self,request):
        pass

    def post(self,request):
        code = request.POST.get('code') if 'code' in request.POST else ''
        content = {'code':200,'msg':'操作成功','data':{}}
        if not code or len(code)<1:
            content['code']=-1
            content['msg']='需要code'
            return JsonResponse(content,safe=False)
        openid=MemberService.getWeChatOpenId(code)
        if openid is None:
            content['code']=-1
            content['msg']='调用出错'
            return JsonResponse(content,safe=False)
        bind_info=BindMember.objects.filter(openid=openid).first()
        if not bind_info:
            content['code'] = -1
            content['msg'] = '未绑定'
            return JsonResponse(content, safe=False)
        member_info=Member.objects.filter(id=bind_info.member_id).first()
        if not member_info:
            content['code'] = -1
            content['msg'] = '未查询到绑定信息'
            return JsonResponse(content, safe=False)
        content['data']={
            'name':member_info.name,
            'number':member_info.number,
            'phone':member_info.phone,
            'school':member_info.school
        }
        token = bind_info.token
        content['token']=token
        content['code'] = 200
        content['msg'] = '信息被删除了'
        return JsonResponse(content, safe=False)


class UploadCard(View):
    def post(self,request):
        content={}
        card_img=Card_image(request.POST)
        token=request.POST.get('token')
        code=request.POST.get('code')
        formid=request.POST.get('formId')
        card_number = request.POST.get('card_number')
        if card_img.is_valid():
            user = get_user_info(token, code)
            if user.number==card_number:
                content['msg'] = '你自己找到了自己的卡了？？？~~~~~'
                content['card_number'] = card_number
                content['code'] = 0
                return JsonResponse(content, safe=False)
            if token:
                card=Card()
                image = request.FILES.get('card')
                c = str(time.time()).replace('.', '')
                image.name = c + '.jpg'

                user_id=user.id
                if not user_id:
                    user_info = user
                    card.image = image
                    card.user_id = user_info.id
                    card.card_number = card_number
                    card.save()

                    user.formid=formid
                    user.save()

                    card = Card.objects.filter(id=card.id).first()
                    ob = CardSerializer(card, many=True)
                    content['data'] = ob.data
                    content['msg'] = '上传成功'
                    content['code'] = 200
                    Service().sen_us_msg( card_number, card.created_time,card.image.url)
                    return JsonResponse(content, safe=False)
                card.image=image
                card.user_id=user_id
                card.card_number=card_number
                card.save()

                user.formid = formid
                user.save()

                card = Card.objects.filter(id=card.id).first()
                ob = CardSerializer(card)
                content['data'] = ob.data
                content['msg'] = '上传成功'
                content['code'] = 200
                Service().sen_us_msg(card_number, card.created_time,card.image.url)
                return JsonResponse(content,safe=False)
            else:
                content['msg']='无效的token'
                content['code']=-1
                return JsonResponse(content,safe=False)
        else:
            content['msg'] = card_img
            content['code'] = -1
            return JsonResponse(content,safe=False)


class Search(View):
    def post(self,request):
        content={}
        key=request.POST.get('key')
        token=request.POST.get('token')
        code=request.POST.get('code')
        user=get_user_info(token,code)  #获取搜搜的人的信息
        # 先判断用户是找卡的还是，找人的
        if user.number==key :   #是自己的卡
            # 找卡的，丢失卡了
            if user.switch:     #判断是否开启了丢卡按钮
                card = Card.objects.filter(card_number=key,status=True).first()
                if card:
                    # 别人已经把卡找到了
                    if card.user_id==user.id:   # 判断是否自己上传自己找
                        content['msg'] = '你自己找到了自己的卡了？？？~~~~~'
                        content['card_number'] = key
                        content['code'] = 0
                        return JsonResponse(content, safe=False)
                    user_info = Member.objects.filter(id=card.user_id).first()
                    user_phone = user_info.phone
                    content['user_phone'] = user_phone
                    content['card_number'] = key
                    content['image'] = card.image.url
                    content['created_time'] = card.created_time
                    content['msg'] = '恭喜您~~你的卡被别人捡到啦，下方有拾到卡的同学的电话哦，单击联系ta快速拨号把卡找回来吧'
                    content['code'] = 200
                    return JsonResponse(content, safe=False)
                else:
                    #     别人还没找到这个卡了
                    content['msg'] = '很遗憾你的一卡通还没找到~~~~~'
                    content['card_number'] = key
                    content['code'] = 0
                    return JsonResponse(content, safe=False)
            else:   # 丢卡按钮没开
                content['msg'] = '你还没开启丢失卡的按钮~~~~~丢看按钮在（我的-我的信息）里面'
                content['card_number'] = key
                content['code'] = 101
                return JsonResponse(content, safe=False)
        else:   #不是自己的卡
            # 找人的，找到卡了
            user=Member.objects.filter(number=key).first()
            if user:    #存在这个一卡通
                if user.switch: #检查对方是否开启了丢失一卡通的按钮
                    user_phone = user.phone
                    content['user_phone'] = user_phone
                    content['card_number'] = key
                    content['msg'] = '感谢您的拾金不昧，下方有卡主人的手机号，单击联系ta可以联系失主还卡哦'
                    content['code'] = 200
                    return JsonResponse(content, safe=False)
                else:
                    content['card_number'] = key
                    content['msg'] = '谢谢你好心人，可惜，这位同学还不知自己的卡丢失了，你可以点击一下按钮发给对方提醒信息~~'
                    content['code'] = 100
                    return JsonResponse(content, safe=False)
            else:   #不存在这个一卡通
                content['card_number'] = key
                content['msg'] = '这个卡的主人还没注册过我们的平台，你可以把它上传，让失主方便找到或者请稍后再来查一下~~'
                content['code'] = 0
                return JsonResponse(content, safe=False)




class GetCard(View):
    def post(self,request):
        content={}
        token=request.POST.get('token')
        code=request.POST.get('code')
        uid=get_user_info(token,code)
        if uid: # 判断这个用户是否存在
            card = Card.objects.filter(user_id=uid.id).all()
            if card:
                ob=CardSerializer(card,many=True)
                content['data']=ob.data
                content['msg'] = '得到卡了'
                content['code'] = 200
                return JsonResponse(content,safe=False)
            else:
                content['msg'] = '你还没上传的卡'
                content['code'] = 0
                return JsonResponse(content, safe=False)
        else:
            # 用户不存在就说明这个用户还没注册就上传照片了~~~~~
            content['data'] = ''
            content['msg'] = '你还没注册'
            content['code'] = 0
            return JsonResponse(content, safe=False)



class CardGive(View):
    def post(self,request):
        content={}
        id=request.POST.get('key')
        if id:
            card=Card.objects.filter(id=id).first()
            if card:
                card.status=False
                card.save()
                content['msg'] = '卡信息修改成功~~~~~'
                content['code'] = 200
                return JsonResponse(content, safe=False)
            else:
                content['msg'] = '找不到对应的卡~~~~~'
                content['code'] = 0
                return JsonResponse(content, safe=False)
        else:
            content['msg'] = '获取不到卡的~~~~~'
            content['code'] = 0
            return JsonResponse(content, safe=False)


class KefudMsg(View):
    def get(self,request):
        token='mutallip'
        echostr=request.GET.get('echostr')
        signature=request.GET.get('signature')
        timestamp=request.GET.get('timestamp')
        nonce=request.GET.get('nonce')
        # UserService.ckeck_kefu_token(token,timestamp,nonce,signature)
        # if echostr:
        #     return HttpResponse(echostr)
        # else:
        #     return HttpResponse(request)
        return HttpResponse('This is get request')

    def post(self, request):
        signature = request.GET.get('signature')
        timestamp = request.GET.get('timestamp')
        nonce = request.GET.get('nonce')
        print(timestamp)
        # print(timestamp)
        # print(nonce)
        return HttpResponse('this is post')

        # if signature:
        #     return HttpResponse(signature)
        # else:
        #     return HttpResponse('erro')


class SendMsg(View):
    def post(self,request):
        content = {}
        token = request.POST.get('token')
        code = request.POST.get('code')
        card_number = request.POST.get('key')
        if card_number:
            user_info=get_user_info(token,code)
            if user_info:
                user_phone=user_info.phone
                Service().sendMsg(card_number,user_phone)
                content['msg']='发送成功'
                content['code']=200
                return JsonResponse(content, safe=False)
        else:
            content['msg'] = '发送失败，得不到卡号'
            content['code'] = 0
            return JsonResponse(content, safe=False)



def get_userid(token):
    bin_info = BindMember.objects.filter(token=token).first()
    if bin_info:
        return bin_info.member_id
    else:
        return False



class Assistant(View):
    def get(self,request):
        return HttpResponse('This is get request')

    def post(self,request):
        return HttpResponse('This is post request')


def get_user_info(token,code):
    bin_info = BindMember.objects.filter(token=token).first()
    if bin_info:
        return Member.objects.filter(id=bin_info.member_id).first()
    else:
        openid = MemberService.getWeChatOpenId(code)
        user_info = Member.objects.filter(openid=openid).first()
        if user_info:
            return user_info
        else:
            return False

def is_number(number,openid):
    content={}
    ob = Member.objects.filter(openid=openid).first()
    if ob:
        if ob.number==number:
            return True
        else:
            return False
    else:
        return False


def set_user_info(bind_info,name,number,phone,school,nickname,switch,formid):
    content={}
    member_info = Member.objects.filter(id=bind_info.member_id).first()
    ob=Member.objects.filter(number=number).first()
    if ob and member_info.number!=number:
        content['msg'] = '该卡号已存在'
        content['code'] = 0
        return content
    member_info.name = name
    member_info.number = number
    member_info.phone = phone
    member_info.school = school
    member_info.switch = switch
    member_info.formid = formid
    member_info.save()
    print('formid:',formid)
    content['code'] = 200
    content['msg'] = '用户信息修改成功~~'
    content['data'] = {'nickname': nickname}
    # token="%s#%s"%(UserService.geneAuthCode(member_info),member_info.id)
    token = bind_info.token
    content['token'] = token
    content['code'] = 200
    return content