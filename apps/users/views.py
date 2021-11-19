import json
import time
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render,HttpResponse,redirect,render_to_response
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.backends import ModelBackend
from django.utils.decorators import method_decorator
from django.views.generic.base import View
from django.db.models import Q
from django.contrib.auth.hashers import make_password   #对密码加密
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

from users.models import Usersinfo, EmailVerifyRecord
from .forms import LoginForm,RegisterForm,Dy_url,Code_image
from utils.email_send import send_register_email
from utils.functions import show
from users.utils.serializers import MeiziSerializer

from functools import wraps
from django.views.generic.edit import CreateView
from captcha.models import CaptchaStore
from captcha.helpers import captcha_image_url

# 验证登录的装饰器
def check_login(f):
    @wraps(f)
    def inner(request,*arg,**kwargs):
        if request.session.get('is_login')=='1':
            return f(request,*arg,**kwargs)
        else:
            return redirect('/users/login/')
    return inner


# Create your views here.
# @method_decorator(check_login)
class LoginView(View):
    def get(self,request):
        if request.session.get('is_login'):
            return redirect('/users/user/')
        return render(request, 'users/login.html',{})
    def post(self,request):
        login_form=LoginForm(request.POST)
        contex={}
        if login_form.is_valid():
            # username = login_form.cleaned_data['username']
            # password = login_form.cleaned_data['password']
            username = request.POST.get('username', '')
            password = request.POST.get('password', '')
            user = Usersinfo.objects.filter(Q(username=username)|Q(email=username)|Q(phone=username), password=password).first()
            if user is not None:
                # serializer = MeiziSerializer(user)
                if user.is_active:
                    request.session['is_login'] = '1'
                    request.session['user_id'] = user.id
                    return JsonResponse({'status':1,'message':'登录成功','data':None},safe=False)
                    # return JsonResponse({'status':1,'message':'登录成功','data':serializer.data},safe=False)
                    # return JsonResponse({'status': 0, 'msg': 'success','data':user})
                    # return HttpResponseRedirect(reverse("user"))
                else:
                    return JsonResponse({'status': 0, 'message': '用户未激活~~~', 'data': None}, safe=False)
                    # return render(request, "users/login.html", {"mes": "用户未激活！"})
            else:
                return JsonResponse({'status': 0, 'message': '用户或密码错误~~~', 'data': None}, safe=False)
        else:
            return JsonResponse({'status': 2, 'message': login_form, 'data': None}, safe=False)
            # return render(request, 'users/login.html', {'form':login_form})


class RegisterView(View):
    def get(self,request):
        register_form=RegisterForm()
        return render(request,'users/regist.html',{'register_form':register_form})

    def post(self,request):
        register_form=RegisterForm(request.POST)
        if register_form.is_valid():
            user_info = Usersinfo()
            email = request.POST.get('email')
            username = request.POST.get('username')
            if Usersinfo.objects.filter(email=email):
                return JsonResponse({'status': 0, 'message': '邮箱已被注册~~~', 'data': None}, safe=False)
                # return render(request, "users/regist.html", { "mes":"邮箱已被注册"})
            elif Usersinfo.objects.filter(username=username):
                return JsonResponse({'status': 0, 'message': '用户名已存在~~~', 'data': None}, safe=False)
                # return render(request, "users/regist.html", {"mes": "用户名已存在"})
            else:
                username = request.POST.get('username')
                password = request.POST.get('password')
                phone = request.POST.get('phone')
                user_info.username=username
                user_info.password=password
                user_info.phone = phone
                user_info.email = email
                user_info.is_active = True
                user_info.save()
                # path='http://' + request.get_host()+'/users/'
                # send_register_email(email, "register",path=path)
                return JsonResponse({'status': 1, 'message': '注册成功了~~~', 'data': None}, safe=False)
                # return render(request, "users/login.html",{'mes':'注册成功了~~~~~'})
        else:
            return JsonResponse({'status': 2, 'message': register_form.errors, 'data': None}, safe=False)
            # return render(request, "users/regist.html", {"form": register_form})


class AciveUserView(View):
    def get(self, request, active_code):
        all_records = EmailVerifyRecord.objects.filter(code=active_code)
        if all_records:
            for record in all_records:
                email = record.email
                user = Usersinfo.objects.get(email=email)
                user.is_active = True
                user.save()
        else:
            return HttpResponse('激活失败')
        return render(request, "users/login.html",{'mes':'激活成功'})

# @method_decorator(check_login)
class User_home(View):
    @method_decorator(check_login)
    def get(self,request):
            contex={}
            mes = request.GET.get('mes')
            data = Usersinfo.objects.filter(id=request.session['user_id']).first()
            if data:
                contex['data'] = data
                contex['mes'] = mes
                return render(request, 'users/user.html', contex)
            else:
                return HttpResponseRedirect(reverse("/users/login/"))

    def post(self,request):
        contex={}
        dy_url = Dy_url(request.POST)
        data=Usersinfo.objects.filter(id=request.session['user_id']).first()
        contex['data']=data
        contex['form']=dy_url
        if dy_url.is_valid():
            dizhi = request.POST.get('url')
            if data:
                data.dy_url=dizhi
                data.save()
                # print('data',data)
                # serializer = MeiziSerializer(data)
                return JsonResponse({'status': 1, 'message': '保存成功', 'data': None}, safe=False)
                # return  redirect('/users/user/?mes%s'%mes)
            else:
                return JsonResponse({'status': 3, 'message': '非法登录', 'data': None}, safe=False)
                # return redirect('login')
        else:
            return JsonResponse({'status': 2, 'message': dy_url.errors, 'data': None}, safe=False)
            # return render(request,'users/user.html',contex)


class LogoutView(View):
    """
    用户登出
    """
    def get(self, request):
        request.session['is_login'] = None
        # logout(request)
        return redirect("/users/login/")


class User_games(View):
    @method_decorator(check_login)
    def get(self,request):
        if request.session.get('is_login')=='1':
            contex={}
            mes = request.GET.get('mes')
            data = Usersinfo.objects.filter(id=request.session['user_id']).first()
            if data:
                contex['data'] = data
                contex['mes'] = mes
                return render(request, 'users/games.html', contex)
            else:
                return HttpResponseRedirect(reverse("/users/login/"))
        return HttpResponseRedirect(reverse("/users/login/"))

    def post(self,request):
        contex={}
        code_im = Code_image(request.POST)
        data=Usersinfo.objects.filter(id=request.session['user_id']).first()
        # contex['data']=data
        contex['form']=code_im
        if code_im.is_valid():
            if data:
                if data.code_image:
                    return JsonResponse({'status': 0, 'message': '二维码只能修改一次，不能再次修改', 'data': None}, safe=False)
                    # return redirect('/users/games/?mes=%s' % mes)
                else:
                    code_image =  request.FILES.get('code_image')
                    code_image.name=data.username+'.jpg'
                    # user = authenticate(username=username, password=password)
                    # a=code_image.url
                    data.code_image=code_image
                    data.save()
                    # Usersinfo.objects.filter(id=request.session['user_id']).update(code_image=request.FILES['code_image'])
                    # data.update(code_image=code_image)
                    # print('data',data)
                    return JsonResponse({'status': 1, 'message': '保存成功', 'data': None}, safe=False)
                    # return redirect('/users/games/?mes=%s' % mes)
            else:
                return redirect('/users/login/')
        else:
            return JsonResponse({'status': 0, 'message': '非法上传', 'data': None}, safe=False)
            # return render(request,'users/games.html',contex)


class AjaxGetCaptcha(View):
    template_name = ''
    # form_class = AjaxForm

    def get(self, form):
        if self.request.is_ajax():
            to_json_response = dict()
            to_json_response['status'] = 0
            # to_json_response['form_errors'] = form.errors

            to_json_response['new_cptch_key'] = CaptchaStore.generate_key()
            to_json_response['new_cptch_image'] = captcha_image_url(to_json_response['new_cptch_key'])

            return HttpResponse(json.dumps(to_json_response), content_type='application/json')

    def form_valid(self, form):
        form.save()
        if self.request.is_ajax():
            to_json_response = dict()
            to_json_response['status'] = 1

            to_json_response['new_cptch_key'] = CaptchaStore.generate_key()
            to_json_response['new_cptch_image'] = captcha_image_url(to_json_response['new_cptch_key'])

            return HttpResponse(json.dumps(to_json_response), content_type='application/json')

