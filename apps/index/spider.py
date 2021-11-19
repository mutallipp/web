# -*- coding: UTF-8 -*-
#@Author    ;Mutallip
import lxml
import requests,re
from tkinter import *
import time
from bs4 import BeautifulSoup as bs

headers={
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
    'cookie': '_ga=GA1.2.709631756.1531357536; c_secure_uid=MjY4MDI3; c_secure_pass=a3d01680829b7f761d3d44defc4fffbf; c_secure_ssl=eWVhaA%3D%3D; c_secure_tracker_ssl=bm9wZQ%3D%3D; c_secure_login=bm9wZQ%3D%3D; _gid=GA1.2.1663224734.1533880599,'
}
start_url='https://bt.byr.cn/torrents.php'

def req(url):
    try:
        r=requests.get(url,headers=headers)
        r.content.decode()
        # print(r.text)
        return r.text
    except :
        print('请求失败')
        return None

def parase(html):
    html=str(html)
    time=re.findall(r'<td class="rowfollow nowrap".*?<span title="(.*?)">.*?',html,re.S)
    if time:
        return time[5]
    else:
        print('网页解析失败')


def run():
    j = True
    html = req(start_url)
    index_time=parase(html)
    n=0
    while j:
        html = req(start_url)
        time_now=parase(html)
        n=n+1
        if not time_now==index_time:
            j=False
            print('找到新的种子了')
            window()
        else:
            print('还没新的种子'+'*'*20,n)
            # print(time_now+'---------'+index_time)
            time.sleep(1)

def window():
    root=Tk()
    root.title('天气查询')
    root.geometry('610x450+500+200')
    lable=Label(root,text='请输入城市的名字：',font=('微软雅黑',10))
    lable.grid(row=0,column=0)

    root.mainloop()



if __name__ == '__main__':
    run()