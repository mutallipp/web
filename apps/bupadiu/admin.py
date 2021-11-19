from django.contrib import admin

# Register your models here.

from bupadiu.models import Member,BindMember,Card

from django.contrib.admin import AdminSite
from django.utils.translation import ugettext_lazy
from django.contrib import admin
admin.site.site_title="mutallip"
admin.site.site_header="mutallip后台管理"
admin.site.index_title="mutallip后台管理页面"

admin.site.register(Member)
admin.site.register(BindMember)
admin.site.register(Card)



