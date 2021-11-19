# 文件名 ：lingyun
# 日期 ：2018/12/18 3:27
# author: Murallip
import json
import urllib.parse
from urllib import parse,request
import datetime
import hashlib

import requests


class Test(object):
    def __init__(self):
        self.baes_url='http://api.hcicloud.com:8880/mt/translate'
        self.devkey = '2f2796994adb3546b49b77887be1ad09'

    def get_data(self,key):
        data_time=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(data_time)
        session_key=self.get_md5(data_time)
        values = key.encode('utf-8')
 #        values={
 #     "question":
 # {
 #        "query": "北京今天的天气怎么样啊"
 #     },
 #    "context": {}
# }
        # key=key.decode('utf-8')
        # print(key)
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36',
            'x-app-key': '745d547a',
            'x-sdk-version': '5.0',
            'x-request-date': data_time,
            'x-task-config': 'capkey=mt.cloud.cn2uy',
            'x-session-key': session_key,
            'x-udid': '101:1234567890',
            'x-result-format':'json'
        }
        print(key)
        # data = urllib.parse.urlencode(values).encode('utf-8')
        res = requests.post(url=self.baes_url,data=values,headers=self.headers)
        # req = request.Request(self.baes_url, data, headers=self.headers)
        # res = request.urlopen(req)
        # res = res.read().decode('utf-8')
        target = json.loads(res.text)
        result=target['ResponseInfo']['ResultText']
        print(result)

    def get_md5(self,data_time):
        r=str(data_time)+self.devkey
        m = hashlib.md5()
        m.update(r.encode("utf8"))
        md5 = m.hexdigest()
        return md5

if __name__ == '__main__':
    a=Test()
    a.get_data('时间过得飞快，转眼间，2018年就要过去了。回顾这一年，可能还有很多遗憾，许多目标也只完成了一半。可是，辛苦了一整年，我们仍要感谢自己，谢谢那个没有轻言放弃、始终努力生活的自己。')