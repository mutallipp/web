# 文件名 ：funtions
# 日期 ：2018/12/18 4:21
# author: Murallip
import json,time
import datetime
import hashlib
import requests

def get_proxy():
    url='http://localhost:5000/get'
    proxy=requests.get(url)
    if proxy:
        # print(proxy.text)
        return proxy.text

def get_transilate(file):
    # f=open(r'G:\Python3.5\django\web\static\dic\audio\1.m4a',"rb+")
    # song =AudioSegment.from_mp3(r'G:\Python3.5\django\web\static\dic\audio\1.mp3')
    # b=song.export('a.pcm ',format="pcm")



    content = {}
    baes_url = 'http://api.hcicloud.com:8880/asr/Recognise'

    data_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(data_time)
    session_key = get_md5(data_time)
    values =open(file,'rb')
    capkey='capkey=asr.cloud.freetalk.uyghur,audioformat=pcm16k16bit,domain=common,identify={}'.format(int(time.time()))
    headers = {
        'User-Agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36',
        'x-app-key': 'e45d5470',
        'x-sdk-version': '5.0',
        'x-request-date': data_time,
        'x-task-config': capkey,
        'x-session-key': session_key,
        'x-udid': '101:1234567890',
        'x-result-format': 'json'

    }
    res = requests.post(url=baes_url, data=values, headers=headers)
    target = json.loads(res.text)
    print(target)
    result = target['ResponseInfo']['ResultText']
    # content['netije'] = result


    # return result

def get_md5(data_time):
    devkey = '2f2796994adb3546b49b77887be1ad09'
    r = str(data_time) + devkey
    m = hashlib.md5()
    m.update(r.encode("utf8"))
    md5 = m.hexdigest()
    # print(md5)
    return md5


def is_Chinese(self,word):
    for ch in word:
        if '\u4e00' <= ch <= '\u9fff':
            return True
    return False

if __name__ == '__main__':
    get_transilate('sdf')