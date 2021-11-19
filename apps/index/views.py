from django.shortcuts import render, HttpResponse, render_to_response
from index.models import Video
from users.models import Usersinfo
from index.funs import get_signature
from django.core.paginator import Paginator  # 分页器
from django.core.paginator import EmptyPage, PageNotAnInteger  # 异常处理
from django.views.decorators.cache import cache_page
from web.settings import APPID,SECRET

appid = APPID
# appid = 'wx2e10adb13bf8a7a7'
secret = SECRET
# secret = 'd778f8b1a08e5d48bfdd2289c035f488'


# @cache_page(60 * 5)
def index(request):
    '''它如果访问下载好的页面的下一页直接跳到download视图'''
    context = {}
    key=request.GET.get('key')
    request.session['key'] = key
    page_num = request.GET.get('page')
    if not page_num:
        return render_to_response('186/home.html')
    # # print('key:',key)
    #
    # vids_list = Video.objects.all().order_by('-update_time')
    # # vids_list = vids_list[::-1]
    # page_robot = Paginator(vids_list, 30)  # 每页显示9张图片
    # page_robot = page_robot
    # try:
    #     vids_list = page_robot.page(page_num)  # 要拿的页数
    # except EmptyPage:
    #     vids_list = page_robot.page(page_robot.num_pages)  # 如果客户输入的页数超出范围，返回数据在的最后一页
    #     # raise Http404('找不到网页')
    # except PageNotAnInteger:
    #     vids_list = page_robot.page(1)  # 如果输入的不是不是整数就返回第一页（比如：zbc，5.5）    context["vids_list"] = vids_list
    #     # print(vids_list.has_next)
    # context['page_num'] = page_num
    # context['num_pages'] = page_robot.num_pages
    # context['vids_list'] = vids_list
    # context['key'] = key
    # return render(request, 'xiaoyao/index.html', context)


def han(request):
    context = {}
    vids_list = Video.objects.filter(tag='han')
    vids_list = vids_list[::-1]
    page_robot = Paginator(vids_list, 30)  # 每页显示9张图片
    page_robot = page_robot
    page_num = request.GET.get('page')
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
    return render(request, 'xiaoyao/index.html', context)


def wei(request):
    context = {}
    vids_list = Video.objects.filter(tag='wei')
    vids_list = vids_list[::-1]
    page_robot = Paginator(vids_list, 30)  # 每页显示9张图片
    page_robot = page_robot
    page_num = request.GET.get('page')
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
    return render(request, 'xiaoyao/index.html', context)


def download(request, page_num=1):
    '''有页码的话，调用这个函数'''
    key = request.GET.get('key')
    request.session['key'] = key
    # print('key:',key)
    context = {}
    vids_list = Video.objects.all().order_by('-update_time')
    page_robot = Paginator(vids_list, 30)  # 每页显示9张图片
    page_robot = page_robot
    page_num = request.GET.get('page')
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
    context['key'] = key
    return render(request, 'xiaoyao/index.html', context)


def home(request):
    return render_to_response('186/home.html')


def detail(request):
    contex = {}
    url_wx = 'http://' + request.get_host() + request.get_full_path()
    # signature = get_signature(url_wx, appid, secret)
    title = request.GET.get('title')
    image = request.GET.get('images')
    id = request.GET.get('id')
    video_url = request.GET.get('video_url')
    data=Video.objects.filter(id=id).first()
    # data.views+=1
    # data.save()
    if not data.type or data.type=='':
        like = Video.objects.all().order_by('-update_time')[:9]
    else:
        like = Video.objects.filter(type=data.type).order_by('-update_time')[:9]
    if not like:
        like=Video.objects.all().order_by('-update_time')[:9]
    contex['title'] = title
    contex['video_url'] = video_url
    contex['images'] = image
    contex['data'] = data
    contex['like'] = like
    # contex['signature'] = signature
    contex['appid'] = appid
    return render_to_response('186/detail.html', contex)


def honor(request):
    return render(request, 'index/honor.html')


def library(request):
    return render(request, 'index/library.html')


def play(request):
    key = request.GET.get('key')
    if key:
        request.session['key']=key
    contex = {}
    url_wx = 'http://' + request.get_host() + request.get_full_path()
    # signature = get_signature(url_wx, appid, secret)
    title = request.GET.get('title')
    image = request.GET.get('images')
    video_url = request.GET.get('video_url')
    id = request.GET.get('id')
    data = Video.objects.filter(id=id).first()
    # data.views+=1
    # data.save()
    if data :
        like = Video.objects.filter(type=data.type).order_by('-update_time')[:9]
        if not like:
            like = Video.objects.all().order_by('-update_time')[:9]
    else:
        like=None
    contex['title'] = title
    contex['video_url'] = video_url
    contex['images'] = image
    # contex['signature'] = signature
    contex['appid'] = appid
    contex['data'] = data
    contex['like'] = like
    return render(request, '186/play.html', contex)


def search(request):
    context = {}
    q = request.POST.get('wd')
    vids_list = Video.objects.filter(title__icontains=q)
    print(q)
    context['q'] = q
    context['vids_list'] = vids_list
    return render(request, '186/search.html',context)


def show(request):
    contex = {}
    title = request.GET.get('title')
    image = request.GET.get('images')
    video_url = request.GET.get('video_url')
    contex['title'] = title
    contex['video_url'] = video_url
    contex['images'] = image
    return render(request, '186/show.html', contex)


def playpc(request):
    contex = {}
    title = request.GET.get('title')
    image = request.GET.get('images')
    video_url = request.GET.get('video_url')
    contex['title'] = title
    contex['video_url'] = video_url
    contex['images'] = image
    return render(request, '186/playpc.html', contex)


def share(request):
    key=request.GET.get('key','')
    context={}
    user=Usersinfo.objects.filter(key=key).first()
    if user:
        dy_url=user.dy_url
    else:
        dy_url=None
    context['dy_url']=dy_url
    # print(dy_url)
    return render(request, '186/share.html',context)


def test(request):
    return render(request,'186/test.html')


def comments(request):
    return render(request,'186/comments.html')

def m3u8(request):
    content={}
    video_url=request.GET.get('video_url')
    content['video_url']=video_url
    return render_to_response('186/m3u8.html',content)

def abla985(request):
    contex = {}
    url_wx = 'http://' + request.get_host() + request.get_full_path()
    key=request.GET.get('key')
    # signature = get_signature(url_wx, appid, secret)
    # contex['signature'] = signature
    contex['appid'] = appid
    contex['key'] = key
    return render(request, '186/abla985.html', contex)



