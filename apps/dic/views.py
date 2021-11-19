import json
import os
import urllib.parse
import datetime
import requests
import hashlib
from dic.models import Audio
from django.http import JsonResponse,HttpResponse
from django.shortcuts import render
from django.views.generic.base import View
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from urllib import parse,request
# from dic.utils.funtions import get_proxy,get_transilate
import time
from pypinyin import pinyin,TONE


class Dic(View):
    def post(self,re):
        content={}
        baes_url = 'http://api.hcicloud.com:8880/mt/translate'
        key=re.POST.get('str')

        str=self.is_Chinese(key)
        if str:
            capkey='capkey=mt.cloud.cn2uy'
        else:
            capkey='capkey=mt.cloud.uy2cn'

        data_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(data_time)
        session_key = get_md5(data_time)
        values = key.encode('utf-8')
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
        result = target['ResponseInfo']['ResultText']
        content['netije']=result
        # print(result)

        return JsonResponse(content,safe=False)


    def is_Chinese(self,word):
        for ch in word:
            if '\u4e00' <= ch <= '\u9fff':
                return True
        return False


    def get(self,request):
        return JsonResponse({'mes':'ok'})


class UploadMp3(View):
    def post(self,request):
        # content={}
        # mp3=request.FILES.get('mp3')
        # path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
        # c = str(time.time()).replace('.', '')
        # mp3.name = 'audio.pcm'
        # mp3.format='pcm'
        # file_path=os.path.join(path,'web/upload/dic/audio/{}'.format(mp3.name)).replace('\\',"/")
        # path_a=default_storage.save(file_path,ContentFile(mp3.read()))
        # print(path_a)
        # get_transilate(path_a)
        # return JsonResponse(content, safe=False)
        pass


class GetText(View):
    def post(self,request):
        r = request.POST.get('data')
        content={}
        if r:
            pinyinlist = pinyin(r, style=TONE)
            text = ''
            for i in pinyinlist:
                text += " " + i[0]
            content['data']=text
            content['status_code']=200
            return JsonResponse(content, safe=False)
        else:
            content['status_code'] = 404
            content['msg'] = '没有内容'
            return JsonResponse(content, safe=False)





def get_md5(data_time):
    devkey = '2f2796994adb3546b49b77887be1ad09'
    r = str(data_time) + devkey
    m = hashlib.md5()
    m.update(r.encode("utf8"))
    md5 = m.hexdigest()
    return md5

