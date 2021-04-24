# 文件名 ：urls
# 日期 ：2018/11/4 2:54
# author: Murallip
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.views.generic import TemplateView
from index import urls
from users.views import LoginView,RegisterView,AciveUserView,User_home,LogoutView,User_games,AjaxGetCaptcha
from web import settings


urlpatterns = [
    # Examples:
    # url(r'^$', 'web01.views.index', name='index'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', include(urls) ,name='urls'),
    url(r'^captcha/', include('captcha.urls')),
    url(r'login/$', LoginView.as_view() ,name='login'),
    url(r'regist/$', RegisterView.as_view() ,name='regist'),
    url(r'user/$', User_home.as_view() ,name='user'),
    url(r'games/$', User_games.as_view() ,name='games'),
    url(r'active/(?P<active_code>.*)/$', AciveUserView.as_view() ,name='active'),
    url(r'log_out/$', LogoutView.as_view() ,name='log_out'),
    url(r'freshcaptcha/$', AjaxGetCaptcha.as_view() ,name='freshcaptcha'),



]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)