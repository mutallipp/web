# 文件名 ：urls
# 日期 ：2018/11/24 21:07
# author: Murallip

from web import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from dic.views import Dic,UploadMp3,GetText


urlpatterns = [
    # Examples:
    # url(r'^$', 'web01.views.index', name='index'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^$', include(urls) ,name='urls'),
    # url(r'^dic/$', Dic.as_view(), name='dic'),
    # url(r'^uploadmp3/$', UploadMp3.as_view(), name='dic'),
    url(r'^get_text/$', GetText.as_view(), name='get_text'),


]


if settings.DEBUG:
    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)