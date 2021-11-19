# 文件名 ：test
# 日期 ：2018/11/28 14:18
# author: Murallip
import os,django,sys
path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(path)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "web.settings")# project_name 项目名称
django.setup()

from uyvideo.models import UyVideo
from index.models import Video
def delete():
    uyvideo=UyVideo.objects.all()
    for i in uyvideo:
        if not 'm3u8' in i.video_url:
            ob=UyVideo.objects.filter(id=i.id)
            ob.delete()
            print('已删除···',i.title)

if __name__ == '__main__':
    delete()