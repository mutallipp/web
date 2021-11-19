# 文件名 ：urls
# 日期 ：2018/11/27 15:45
# author: Murallip

from web import settings
from django.conf.urls import  url
from django.conf.urls.static import static
from apps.uyvideo.views import index,play,swiper,playm3u8,search,show,test


urlpatterns = [
    # Examples:
    # url(r'^$', 'web01.views.index', name='index'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^$', include(urls) ,name='urls'),
    url(r'^/$', index, name='index'),
    url(r'index/$', index, name='index'),
    url(r'play/$', play, name='play'),
    url(r'swiper/$', swiper, name='swiper'),
    url(r'playm3u8/$', playm3u8, name='playm3u8'),
    url(r'search/$', search, name='uysearch'),
    url(r'show/$', show, name='uyshow'),
    url(r'test/$', test, name='uytest'),


]


if settings.DEBUG:
    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

