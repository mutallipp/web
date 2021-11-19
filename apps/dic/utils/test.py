# 文件名 ：test
# 日期 ：2018/11/24 21:28
# author: Murallip
import json,time
import os
import urllib.parse
from urllib import parse,request
import datetime

import requests

from funtions import get_proxy


class Dic():
    def post(self,key):
        self.post_url='https://izqut.wxnet.cc/app/dict/index.php'
        # self.post_url='http://www.hcicloud.com/experimental/translate'
        # str=request.POST.get('str')
        values = {
            'str': key,
        }
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36'
        }
        # proxies=get_proxy()
        # print(proxies)
        # target=requests.post(url=self.post_url,data=values,headers=self.headers,proxies ={'http':proxies} ).json()
        ",('Content-Type','application/x-www-form-urlencoded')"
        # proxy = {'http': 'http://119.29.208.90:8888'}
        # proxy_support = request.ProxyHandler(proxy)
        # opener = request.build_opener(proxy_support)
        # opener.addheaders = [('User-Agent',
        #                       'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36')]
        # request.install_opener(opener)
        data = urllib.parse.urlencode(values).encode('utf-8')
        # res = request.urlopen(url=self.post_url,data=data)
        req = request.Request(self.post_url, data, headers=self.headers )
        # req.set_proxy('119.29.208.90:8888','http')
        # print(proxies)
        res = request.urlopen(req)
        res = res.read().decode('utf-8')
        target = json.loads(res)
        print(target)

    def is_Chinese(self,word):
        for ch in word:
            if '\u4e00' <= ch <= '\u9fff':
                return True
        return False


def attack():
    url='https://www.aicloud.com/dev/ability/mt.html'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36'
    }
    data={
        'convert':2,
        'content':'我爱你'
    }
    n=1
    while True:
        response=requests.post(url=url,data=data,headers=headers)
        print('--'*50+'->',n)
        print(response.json())
        n+=1
        time.sleep(0.7)




if __name__ == '__main__':
    # Dic().post('我爱中国')
    # a=d.is_Chinese('جۇڭگونى')
    # print(datetime.datetime.now())
    attack()