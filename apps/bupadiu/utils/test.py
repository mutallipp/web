# 文件名 ：test
# 日期 ：2018/12/21 17:33
# author: Murallip
import json

from web import settings
from bupadiu.utils.userService import  MemberService,Service
import requests

def test_info():
    access_token=Service.getAccessToken()
    url='https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token={}'.format(access_token)
    openid='oymyH5Gf-8toZvH8XZDKGkDYyLS0'
    template_id='uH3KUvDoNLaPw5TkBx222-V--t1s6jy96Ok7VLvkLcE'
    formid="1545393524994"
    temp={
             "touser": openid, # 用户的openid
    "template_id": template_id, # 模板id
    "page": "",
    "form_id": formid, # 表单id
    "data": {
        "keyword1": {
            "value": '一卡通',
            "color": "#173177"
        },
        "keyword2": {                   #物品描述
            "value": '卡号：2017210210'
        },
        "keyword3": {                   #认领方式
            "value": '一卡通中心'
        },
        "keyword4": {                   # 发布时间
            "value": '2018-12-21'
        },
        "keyword5": {                   #联系人
            "value": '好心人'
        },
        "keyword6": {                     # 类型
            "value": '手机号'
        },
        "keyword7": {                       # 联系方式
            "value": '平台内可以看到'
        },
            "keyword8": {                   # 處理進度
            "value": '站内'
        },
    },
   # "emphasis_keyword": "keyword1.DATA" # 将keyword1放大

    }
    temp=json.dumps(temp)
    reponse=requests.post(url=url,data=temp)
    print(access_token)
    print(reponse.json())

if __name__ == '__main__':
    test_info()


