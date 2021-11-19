# 文件名 ：test
# 日期 ：2018/11/4 10:59
# author: Murallip
import hashlib

import time


def md5(data):
    md5 = hashlib.md5()  # 应用MD5算法
    # data = "hello world"
    md5.update(data.encode('utf-8'))
    print(md5.hexdigest())

md5('abla')
# print(make_password(2))
# print(str(int(time.time())))