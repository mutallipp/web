# 文件名 ：urls
# 日期 ：2018/11/7 23:34
# author: Mutallip

from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from web import settings
from bupadiu.views import LoginView,Loginchek,UploadCard,Search,GetCard,CardGive,SendMsg,KefudMsg,Assistant


urlpatterns = [

    url(r'^$', LoginView.as_view() ,name='bupadiu_login'),
    url(r'^login/$', LoginView.as_view() ,name='bupadiu_login'),
    url(r'^loginchek/$', Loginchek.as_view() ,name='bupadiu_loginchek'),
    url(r'^uploadcard/$', UploadCard.as_view() ,name='bupadiu_uploadcard'),
    url(r'^search/$', Search.as_view() ,name='bupadiu_search'),
    url(r'^getcard/$', GetCard.as_view() ,name='bupadiu_getcard'),
    url(r'^cardgive/$', CardGive.as_view() ,name='bupadiu_cardgive'),
    url(r'^sendmsg/$', SendMsg.as_view() ,name='bupadiu_sendmsg'),
    url(r'^kefumsg/$', KefudMsg.as_view() ,name='bupadiu_kefumsg'),
    url(r'^assistant/$', Assistant.as_view() ,name='bupadiu_assistant'),


]


if settings.DEBUG:
    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
