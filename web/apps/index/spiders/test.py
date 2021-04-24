# 文件名 ：test
# 日期 ：2018/11/13 22:20
# author: Murallip
import json
import urllib.parse
from urllib import request

def test():
    values = {"c_user_id": 209747, "session_key": "bfde27bc7edb55c3df215a9957ac1565", "device": "hradio", "id": 26,
              "page": 1}
    post_url='https://api.fm.subat.cn/v2.2/radio-category/radios'
    headers={
            'User-Agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36'
        }
    for i in range(100):
        values ={"c_user_id":209747,"session_key":"bfde27bc7edb55c3df215a9957ac1565","device":"hradio","id":26,"page":1}
        values['id']=i
        data = urllib.parse.urlencode(values).encode('utf-8')
        req = request.Request(post_url, data, headers=headers)
        res = request.urlopen(req)
        res = res.read().decode('utf-8')
        target = json.loads(res)
        if target['rc']==1:
            if target['data']['total']!=0:
                print(i)


if __name__ == '__main__':
    test()