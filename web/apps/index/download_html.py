# -*- coding: utf-8 -*-
# Time    : 2018/10/1 12:08
# @Email   : 741116327@qq.com
# @File    : download_html.py
# @Software: PyCharm
# @Author  : Mutallip
import os
import urllib.request


def getHtml(url):
    html = urllib.request.urlopen(url).read()
    return html

base=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def saveHtml( file_content):
    #    注意windows文件命名的禁用符，比如 /
    with open(base+'/templates/186/home.html', "wb") as f:
        #   写文件用bytes而不是str，所以要转码
        f.write(file_content)


def run():
    aurl = "http://mutallip.cn/index/download/"

    html = getHtml(aurl)

    # file_name = 'template'
    saveHtml( html)
    print('下载完成')
if __name__ == '__main__':

    run()
