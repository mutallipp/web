# 文件名 ：spider
# 日期 ：2018/11/28 12:57
# author: Murallip
import os,django,sys
import time
import datetime
from urllib import request

from PIL import Image
from io import BytesIO
import re
import requests
path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(path)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "web.settings")# project_name 项目名称
django.setup()
from uyvideo.models import UyVideo
from uyvideo.spiders.uyspider import Izqut,Arzu,Night
from uyvideo.spiders.download_index_html import Download_html

def spider():
    print(datetime.datetime.now())
    # izqut=Izqut().run()
    # arzu=Arzu().run()
    # sava2msql(arzu)
    # sava2msql(izqut)
    night=Night().run()
    # print_image(night)
    sava2msql(night)
    Download_html().http_down()

def print_image(data):
    for i in data:
        print(i['image_url'])

def sava2msql(data):
    title_list=get_title()
    for i in data:
        if i['title'] in title_list:
            print('已存在',i['title'])
            title_list.append(i['title'])
        else:
            if i['video_url'] and i['title']:
                image_url=sava_image(i['image_url'])
                if image_url :
                    video=UyVideo()
                    video.title=i['title']
                    video.video_url=i['video_url']
                    video.image_url=image_url
                    video.save()
                    print('成功的存到了数据库',i['title'])

def sava_image(url):
    c=str(time.time()).replace('.','')
    image_name = '/static/uyvideo/video_img/'+ c+'.jpg'
    imgpath=path.replace('\\','/')
    try:
        r = requests.get(url, timeout=30)
        r.raise_for_status()
        r.encoding = r.apparent_encoding
    except Exception as e:
        return None
    if not os.path.exists(imgpath+'/static/uyvideo/video_img'):
        os.makedirs(imgpath+'/static/uyvideo/video_img')
    try:
        file_path=imgpath+image_name
        if not os.path.exists(file_path):
            # response = requests.get(url)
            # image = Image.open(BytesIO(response.content))
            # image.save(file_path)
            with open(file_path, 'wb') as f:
                f.write(r.content)
                f.close()
            print('保存成功')
            time.sleep(1)
            return image_name
        else:
            print('图片已存在')
            return None
    except Exception as e:
        print(e)
        return None



def get_title():
    title_list=[]
    obj=UyVideo.objects.all()
    for k in obj:
        title_list.append(k.title)
    return title_list


if __name__ == '__main__':
    spider()
    # a=sava_image('http://wolqan.gz01.bdysite.com/kino_images/1537258077875.jpg')
    # print(a)