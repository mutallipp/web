import os

import requests,re,json
import MySQLdb
import pymysql,time,datetime
from bs4 import BeautifulSoup as bq


class DY186(object):
    def __init__(self):
        'http://ekranimtv.bookb.cn/index.php'
        self.start_url='http://186.y3199.cn'
        self.headers={
            'User-Agent': 'Mozilla/5.0 (Linux U Android 2.3.6 zh-cn GT-S5660 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MicroMessenger/4.5.255',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,images/webp,images/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate'
        }

    def req(self,url):
        try:
            response = requests.get(url, headers=self.headers)
            r = response.content.decode()
            if r :
                return r
        except :
            print('请求失败')
            return None



    def get_index(self,page=2):
        # n=8
        data_list = []
        j=True
        # while j:
        for n in range(1,page):
            r=self.req(self.start_url+'/index.php?c=whole&key=1_______0_addtime_{}'.format(n))
            r=str(r)
            parase = re.findall(r'<div class="pic".*?<a href="(.*?)".*?<img src="(.*?)".*?<span class="sTit".*?<a href="" target="_self">(.*?)</a></span>',r,re.S )
            for i in parase:
                url=self.start_url+i[0]
                vedeo_url=self.video_url(url)
                list_dic={
                    'title':i[2],
                    'images':i[1],
                    'video_url':vedeo_url,
                }
                # print(list_dic)
                data_list.append(list_dic)
            if n==0:
                j=False
            # n=n-1
            print(n)

        return data_list

    def video_url(self,url):
        url=re.sub('show','play',url)
        respons=self.req(url)
        respons=str(respons)
        vedeo_url=re.findall(r'<iframe src=".*?url=(.*?)"',respons,re.S)
        if vedeo_url:

            return vedeo_url[0]
        else:
            print('电影网页解析失败')
            return None

    def save_local(self,data):
        for i in data:
            with open('video_url.txt','a') as f:
                f.write(i['video_url']+'\n')


    def save_msql(self,data):
        conn = pymysql.connect(
            host='localhost',
            port=3306,
            user='root',
            passwd='root',
            db='video',
            charset="utf8"
        )
        for i in data:
            if i:
                cursor = conn.cursor()
                cursor.execute("select * from index_video;")
                # values = cursor.fetchall()
                # sql = "insert into index_video(title, url_image, vedeo_url) values('%s', '%s', %s)" % (i['title'], i['images'],i['video_url'])
                sql = "insert into index_video(title, url_image, video_url,editors_choice,time) values('%s', '%s', '%s','%d','%s')" % (i['title'], i['images'],i['video_url'],1,datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
                print(sql)
                try:
                    cursor.execute(sql)
                    conn.commit()
                except Exception :
                    conn.rollback()
                    print('存到MySQL失败了')


                # cursor.close()
        conn.close()

def test_time():
    with open('jsapi_ticket.txt','w+') as f:
        since=f.read()
    if not since:
        since=str(time.time())
        f.write(since)
        print(since)
    else:
        since=int(since)
        since = time.time()-since
        print(since)

if __name__ == '__main__':
    # dy=DY186()
    # r=dy.get_index()
    # r = r[:10]
    # print(r)
    # if '道高一丈' in r.values():
    #     print('存在')
    # else:
    #     print('不存哎')
    # # save_msql(r)
    # # save(r)
    # print(time.time())
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pwd = os.getcwd()
    print(base)
    print(pwd)

