# -*- coding: utf-8 -*-
# Time    : 2018/10/3 12:07
# @Email   : 741116327@qq.com
# @File    : urls.py
# @Software: PyCharm
# @Author  : Mutallip
from django.views.generic import TemplateView
from django.conf.urls import include, url
from django.conf.urls.static import static
from web import settings
from index.views import index,detail ,honor,library,play,search,show,download,share,playpc,han,wei,test,comments,abla985,m3u8

urlpatterns = [
    # Examples:
    # url(r'^$', 'web01.views.index', name='index'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', index, name='index'),
    # url(r'(?P<cate>[A-Za-z]+)$', index, name='index'),
    url(r'han/$', han, name='han'),
    url(r'wei/$', wei, name='han'),
    url(r'detail/$', detail, name='detail'),
    url(r'honor/$', honor, name='honor'),
    url(r'library/$', library, name='library'),
    url(r'play/$', play, name='play'),
    # url(r'playdetail', TemplateView.as_view(template_name='186/playdetail.html')),
    url(r'search/', search, name='search'),
    url(r'show/$', show, name='show'),
    url(r'download/$', download, name='download'),
    url(r'share/$', share, name='share'),
    url(r'playpc/$', playpc, name='playpc'),
    url(r'test/$', test, name='test'),
    url(r'comments/$', comments, name='comments'),
    url(r'abla985/$', abla985, name='abla985'),
    url(r'm3u8/$', m3u8, name='m3u8'),


]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)