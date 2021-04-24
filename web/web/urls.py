from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from index import urls
from weixin import urls as weixin
from users import urls as user
from bupadiu import urls as bupadiu
from uyvideo import urls as uyvideo
from dic import urls as dic
from web import settings


urlpatterns = [
    # Examples:
    # url(r'^$', 'web01.views.index', name='index'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^mutallip/', include(admin.site.urls)),
    url(r'^$', include(urls) ,name='urls'),
    url(r'^index/', include(urls) ,name='urls'),
    url(r'^weixin/', include(weixin) ,name='weixin'),
    url(r'^users/', include(user) ,name='user'),
    url(r'^bupadiu/', include(bupadiu) ,name='bupadiu'),
    url(r'^dic/', include(dic) ,name='dic'),
    url(r'^uyvideo/', include(uyvideo) ,name='uyvideo'),
    # url(r'^index/(?P<cate>[A-Za-z]+)$', index, name='index'),

]


if settings.DEBUG:
    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
