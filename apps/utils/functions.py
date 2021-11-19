# 文件名 ：functions
# 日期 ：2018/11/10 15:13
# author: Murallip
import json

def show(status,message,data=None):
    a={
        'status':status,
        'message':message,
        'data':data,
    }
    result=json.dumps(a)
    return result

if __name__ == '__main__':
    ni='ni'
    result=show(1,'ok',{'wo ':ni})
    print(result)