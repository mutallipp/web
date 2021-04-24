# -*- coding: utf-8 -*-
# Time    : 2018/9/27 1:07
# @Email   : 741116327@qq.com
# @File    : funs.py
# @Software: PyCharm
# @Author  : Mutallip
import json
import os
from web.settings import BASE_DIR

import requests
import time
from index.sign import Sign

appid = 'wx85b87f5faa0404da'
secret = '128be7ec09fa958e18b036b477c9b895'
url = 'http://mutallip.cn/weixin'

def get_signature(url, appid, secret):
    token=get_access_token(appid,secret)
    jsapi_ticket=get_jsapi_ticket(token)
    sigin = Sign(jsapi_ticket, url)
    # print(sigin.sign())
    return sigin.sign()

base=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def get_access_token(appid,secret):
    data={}
    f=open(BASE_DIR+'/static/186/access_token.json',encoding='utf-8')
    # f=open('access_token.json',encoding='utf-8')
    load_dict=json.load(f)
    f.close()
    if load_dict['expires_tme']<time.time():
        r = requests.get((
                          'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}').format(
            appid, secret)).json()
        print(r)
        access_token=r['access_token']
        if access_token:
            load_dict['expires_tme']=time.time()+7000
            load_dict['access_token']=access_token
            # print('new token')
        with open(BASE_DIR+'/static/186/access_token.json','w') as ff:
        # with open('access_token.json','w') as ff:
            json.dump(load_dict,ff)
        data=load_dict
    else:
        data=load_dict
        # print('old token',load_dict)
    return data['access_token']

def get_jsapi_ticket(access_token):
    # r = requests.get(
    #     'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi').json()
    # print(r)
    data={}
    f=open(BASE_DIR+'/static/186/jsapi_ticket.json',encoding='utf-8')
    # f=open('jsapi_ticket.json',encoding='utf-8')
    load_dict=json.load(f)
    f.close()
    if load_dict['expires_tme']<time.time():
        r = requests.get(
            'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi').json()
        ticket=r['ticket']
        if ticket:
            load_dict['expires_tme']=time.time()+7000
            load_dict['ticket']=ticket
            # print('new ticket',load_dict)
        with open(BASE_DIR+'/static/186/jsapi_ticket.json','w') as ff:
            json.dump(load_dict,ff)
        data=load_dict
    else:
        data=load_dict
        # print('old ticket',load_dict)
    return data['ticket']



if __name__ == '__main__':
    appid = 'wx2e10adb13bf8a7a7'
    secret = 'd778f8b1a08e5d48bfdd2289c035f488'
    url='http://mutallip.cn/weixin'
    # get_signature(url, appid, secret)
    print(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))