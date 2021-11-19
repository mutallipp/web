from django.shortcuts import render
from users.models import Usersinfo
from index.funs import get_signature
from web.settings import APPID,SECRET

# Create your views here.
def get_code_url(request):
    # try:
    #     code_image=request.session['code_image']
    #     if code_image is None:
    #         key = request.GET.get('key')
    #         # user=Usersinfo()
    #         data = Usersinfo.objects.filter(key=key).first()
    #         if data:
    #             if data.code_image:
    #                 code_image = data.code_image.url
    #             else:
    #                 code_image = None
    #         else:
    #             code_image = None
    #         request.session['code_image'] = code_image
    #
    # except Exception as e:
    key = request.GET.get('key')
    # user=Usersinfo()
    data=Usersinfo.objects.filter(key=key).first()
    if data:
        if data.code_image:
            code_image=data.code_image.url
        else:
            code_image=None
    else:
        code_image=None
    request.session['code_image'] = code_image


def arzu(request):
    get_code_url(request)

    return render(request, 'weixin/arzu.html')


def top(request):
    key = request.GET.get('key')
    return render(request, 'weixin/top.html',{'key':key})


def kamqilik(request):
    # if request.session['code_image']:
    #     code_image = request.session['code_image']
    #
    # else:
    #     key = request.GET.get('key')
    #     # user=Usersinfo()
    #     data=Usersinfo.objects.filter(key=key).first()
    #     if data:
    #         if data.code_image:
    #             code_image=data.code_image.url
    #         else:
    #             code_image=None
    #     else:
    #         code_image=None
    #     request.session['code_image'] = code_image
    get_code_url(request)
    return render(request, 'weixin/kamqilik.html')


def kadimki(request):
    get_code_url(request)
    return render(request, 'weixin/kadimki.html')

def mijaz(request):
    get_code_url(request)
    return render(request, 'weixin/mijaz.html')


def yurak(request):
    get_code_url(request)
    return render(request, 'weixin/yurak.html')


def boytak(request):
    get_code_url(request)
    return render(request, 'weixin/boytak.html')


def dostsinax(request):
    get_code_url(request)
    return render(request, 'weixin/dostsinax.html')


def lovenums(request):
    get_code_url(request)
    return render(request, 'weixin/lovenums.html')

def tenyears(request):
    get_code_url(request)
    return render(request, 'weixin/tenyears.html')


def dic(request):
    context={}
    url_wx = 'http://' + request.get_host() + request.get_full_path()
    key=request.GET.get('key')
    signature = get_signature(url_wx, APPID, SECRET)
    context['signature'] = signature
    context['appid'] = APPID
    context['key'] = key
    return render(request, 'weixin/dic.html',context)


def hongbao(request):
    context={}
    url_wx = 'http://' + request.get_host() + request.get_full_path()
    key=request.GET.get('key')
    signature = get_signature(url_wx, APPID, SECRET)
    context['signature'] = signature
    context['appid'] = APPID
    context['key'] = key
    return render(request, 'weixin/hongbao.html',context)


def hongbao1(request):
    context={}
    key=request.GET.get('key')
    context['key'] = key
    return render(request, 'weixin/hongbao1.html',context)