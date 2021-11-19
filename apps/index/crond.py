# -*- coding: utf-8 -*-
# Time    : 2018/9/21 2:25
# @Email   : 741116327@qq.com
# @File    : crond.py
# @Software: PyCharm
# @Author  : Mutallip
from index.models import Video
import datetime,time
from index.spiders.crawler import Xiaoyao,Yingyuan
from index.spiders.download_index_html import Download_html
from  index.spiders import get_video_info

def run():
    spider()
    # # http_down()




def get_title():
    title_list = []
    obj = Video.objects.filter(tag='han')       #获取数据库里面全部title
    # self.obj = list(self.obj)
    for k in obj:
        title_list.append(k.title)
    return title_list


def spider():
    print(datetime.datetime.now())
    title_list = []
    obj = Video.objects.filter(tag='han')  # 获取数据库里面全部title
    # self.obj = list(self.obj)
    for k in obj:
        title_list.append(k.title)
    xy=Xiaoyao().run()[:10]
    save_db(xy)
    yx = Yingyuan().run()[:10]
    save_db(yx)
    Download_html().http_down()


def save_db(data):
    title_list=get_title()
    for i in data:
        if i['title'] in title_list:
            # Video.objects.filter(title=i['title']).update(url_image=i['images'], video_url=i['video_url'])
            print('电影已存在', i['title'])
        else:
            info = get_video_info.run(i['title'])
            if info:
                print(i['title']+'~~~~~~~~~~~~~~~~~~~~~成功了-----')

                type=info['type']
                director=info['director']
                actors=info['actors']
                area=info['area']
                content=info['content']
                print(type,director)
            else:
                print(i['title'] + '~~~~~~~~~~~~~~~~~~~~~失败------')
                director = type =actors =area =content =None
                print()
            obj = Video(title=i['title'], url_image=i['image_url'], video_url=i['video_url'], tag='han',
                        create_time=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),content=content,type=type,director=director,actors=actors,area=area)
            obj.save()
            title_list.append(i['title'])
            print('没有', i['title'])

            time.sleep(2)


if __name__ == '__main__':
    # get_videoinfo('长城')
    print('6982558')



