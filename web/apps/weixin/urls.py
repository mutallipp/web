# -*- coding: utf-8 -*-
# Time    : 2018/10/10 22:12
# @Email   : 741116327@qq.com
# @File    : urls.py
# @Software: PyCharm
# @Author  : Mutallip
from web import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from weixin.views import arzu,top,kamqilik,kadimki,mijaz,yurak,boytak,dic,dostsinax,lovenums,tenyears,hongbao,hongbao1

urlpatterns = [
    # Examples:
    # url(r'^$', 'web01.views.index', name='index'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^$', include(urls) ,name='urls'),
    url(r'arzu/$', arzu, name='arzu'),
    url(r'top/$', top, name='top'),
    url(r'kamqilik/$', kamqilik, name='kamqilik'),
    url(r'kadimki/$', kadimki, name='kadimki'),
    url(r'mijaz/$', mijaz, name='mijaz'),
    url(r'yurak/$', yurak, name='yurak'),
    url(r'boytak/$', boytak, name='boytak'),
    url(r'dic/$', dic, name='weidic'),
    url(r'dostsinax/$', dostsinax, name='dostsinax'),
    url(r'lovenums/$', lovenums, name='lovenums'),
    url(r'tenyears/$', tenyears, name='tenyears'),
    url(r'hongbao/$', hongbao, name='hongbao'),
    url(r'hongbao1/$', hongbao1, name='hongbao1'),

]


if settings.DEBUG:
    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)