from django.shortcuts import render,render_to_response
from index.models import Video
from django.core.paginator import Paginator
from django.core.paginator import EmptyPage, PageNotAnInteger  # 异常处理

from users.models import Usersinfo
from uyvideo.models import UyVideo
from index.views import get_signature
from web.settings import APPID,SECRET

# Create your views here.

def index(request):
    page_num = request.GET.get('page')
    key = request.GET.get('key')
    request.session['key'] = key
    if not page_num:
        return render_to_response('uyvideo/home.html')
    # print('key:',key)
    context = {}
    vids_list = UyVideo.objects.all().order_by('-update_time')
    page_robot = Paginator(vids_list, 30)  # 每页显示9张图片
    page_robot = page_robot
    try:
        vids_list = page_robot.page(page_num)  # 要拿的页数
    except EmptyPage:
        vids_list = page_robot.page(page_robot.num_pages)  # 如果客户输入的页数超出范围，返回数据在的最后一页
        # raise Http404('找不到网页')
    except PageNotAnInteger:
        vids_list = page_robot.page(1)  # 如果输入的不是不是整数就返回第一页（比如：zbc，5.5）    context["vids_list"] = vids_list
        # print(vids_list.has_next)
    context['page_num'] = page_num
    context['num_pages'] = page_robot.num_pages
    context['vids_list'] = vids_list
    context['swiper'] = UyVideo.objects.all().order_by('-views')[:5]
    context['key'] = key
    return render(request,'uyvideo/index.html' ,context)


def play(request):
    context={}
    id=request.GET.get("id")
    key=request.GET.get("key")
    if key:
        request.session['key'] = key
    url_wx = 'http://' + request.get_host() + request.get_full_path()
    data=UyVideo.objects.filter(id=id).first()
    data.views+=1
    data.save()
    like=UyVideo.objects.filter().order_by('-update_time')[:6]
    # signature = get_signature(url_wx, APPID, SECRET)
    # context['signature'] = signature
    context['appid'] = APPID
    context['data']=data
    context['like']=like
    return render(request,'uyvideo/play.html',context)


def show(request):
    context={}
    title = request.GET.get('title')
    video_url=request.GET.get("video_url")
    # data = UyVideo.objects.filter(id=id).order_by('-update_time')
    like = UyVideo.objects.filter().order_by('-update_time')[:6]
    context['title']=title
    context['like']=like
    context['video_url']=video_url
    return render(request,'uyvideo/show.html',context)

def swiper(request):
    context={}
    vid_list=UyVideo.objects.all().order_by('-views')[:5]
    context['vids_list']=vid_list
    return render_to_response('uyvideoBak/swiper.html',context)

def playm3u8(request):
    context={}
    video_url=request.GET.get('video_url')
    context['video_url']=video_url
    return render_to_response('uyvideo/playm3u8.html',context)


def search(request):
    contex={}
    wd=request.POST.get('wd')
    vids_list=UyVideo.objects.filter(title__icontains=wd)
    length=len(vids_list)
    contex['vids_list']=vids_list
    contex['length']=length
    return render_to_response('uyvideoBak/search.html',contex)


def share(request):
    key=request.GET.get('key','')
    context={}
    user=Usersinfo.objects.filter(key=key).first()
    if user:
        dy_url=user.dy_url
    else:
        dy_url=None
    context['dy_url']=dy_url
    return render(request, '186/share.html',context)


def test(request):
    context={}
    id=request.GET.get("id")
    url_wx = 'http://' + request.get_host() + request.get_full_path()
    data=UyVideo.objects.filter(id=id).first()
    like=UyVideo.objects.filter().order_by('-update_time')[:6]
    # signature = get_signature(url_wx, APPID, SECRET)
    # context['signature'] = signature
    context['appid'] = APPID
    context['data']=data
    context['like']=like
    return render(request,'uyvideo/test.html',context)
