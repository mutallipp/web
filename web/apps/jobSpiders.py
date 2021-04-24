# 文件名 ：jobSpiders
# 日期 ：2018/11/29 20:28
# author: Murallip

from index.spiders.vdspider import spider as index
from uyvideo.spiders.spider import spider as uyvideo


def spider():
    index()
    uyvideo()