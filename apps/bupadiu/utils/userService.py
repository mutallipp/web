# 文件名 ：userService
# 日期 ：2018/11/11 6:53
# author: Murallip
import os,sys,django

import time

from datetime import datetime

path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(path)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "web.settings")# project_name 项目名称
django.setup()

from bupadiu.models import AccessToken,Member

import hashlib,base64,random,string
import hashlib,requests,random,string,json
from web import settings

class UserService():

    @staticmethod
    def ckeck_kefu_token(token,timestamp,nonce):
        r=token+timestamp+nonce
        r.sort()
        a=hashlib.sha1(r.encode("utf8")).hexdigest()
        print('token:'+a)

    @staticmethod
    def geneAuthCode(user_info = None ):
        m = hashlib.md5()
        str = "%s-%s" % (user_info.id, user_info.nickname)
        m.update(str.encode("utf-8"))
        return m.hexdigest()

    @staticmethod
    def genePwd( pwd,salt):
        m = hashlib.md5()
        str = "%s-%s" % ( base64.encodebytes( pwd.encode("utf-8") ) , salt)
        m.update(str.encode("utf-8"))
        return m.hexdigest()

    @staticmethod
    def geneSalt( length = 16 ):
        keylist = [ random.choice( ( string.ascii_letters + string.digits ) ) for i in range( length ) ]
        return ( "".join( keylist ) )



class MemberService():

    @staticmethod
    def geneAuthCode( member_info = None ):
        m = hashlib.md5()
        str = "%s-%s-%s" % ( member_info.id, member_info.salt,member_info.openid)
        m.update(str.encode("utf-8"))
        return m.hexdigest()

    @staticmethod
    def geneSalt( length = 16 ):
        keylist = [ random.choice( ( string.ascii_letters + string.digits ) ) for i in range( length ) ]
        return ( "".join( keylist ) )





    @staticmethod
    def getWeChatOpenId( code ):
        url = "https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code" \
            .format(settings.MINA['APPID'], settings.MINA['SECRET'], code)
        r = requests.get(url)
        res = json.loads(r.text)
        openid = None
        # print('APPID:'+settings.MINA['APPID'],'SECRET'+settings.MINA['SECRET'],'code'+code)
        print(res)
        if 'openid' in res:
            openid = res['openid']
        return openid


class Service(object):
    def __init__(self):
        pass

    def ckeck_kefu_token(self,token,timestamp,nonce,signature):
        r=[token,timestamp,nonce]
        r.sort()
        r=r[0].join('')
        a=hashlib.sha1(r.encode("utf8")).hexdigest()
        if a==signature:
            return True
        else:
            return False

    def getAccessToken(self,):
        token=AccessToken.objects.all().first()
        if not token :
            # 如果数据库中没有数据就创建
            token=AccessToken()
            url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}'.format(
                settings.MINA['APPID'], settings.MINA['SECRET'])
            r = requests.get(url).json()
            expires_in=int(time.time())+6800
            access_token=r['access_token']
            token.expires_in=expires_in
            token.access_token=access_token
            token.save()
            print("access_token存到数据库中了")
            return token.access_token

        else:
            if token.expires_in<int(time.time()):
                url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}'.format(
                    settings.MINA['APPID'], settings.MINA['SECRET'])
                r = requests.get(url).json()
                expires_in = int(time.time()) + 6800
                access_token = r['access_token']
                token.expires_in = expires_in
                token.access_token = access_token
                token.save()
                print("access_token更新了")
                return token.access_token
            else:
                return token.access_token

    def sendMsg(self,card_number,phone_number):
        user_info = Member.objects.filter(number=card_number).first()
        if user_info:
            formid = user_info.formid
            openid = user_info.openid
            access_token = self.getAccessToken()
            print( "/pages/my/getcartinfo/index?user_phone={0}&card_number={1}".format(phone_number,card_number))
            url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token={}'.format(access_token)
            template_id = 'uH3KUvDoNLaPw5TkBx22274JBzY0G8LgKmtsa-UtbTs'
            temp = {
                "touser": openid,  # 用户的openid
                "template_id": template_id,  # 模板id
                "page": "/pages/my/managecart/card?user_phone={0}&card_number={1}".format(phone_number,card_number),
                "form_id": formid,  # 表单id
                "data": {
                    "keyword1": {
                        "value": '一卡通',
                        "color": "#173177"
                    },
                    "keyword2": {  # 物品描述
                        "value": '卡号：' + str(card_number)
                    },
                    "keyword3": {  # 认领方式
                        "value": '一卡通中心'
                    },
                    "keyword4": {  # 备注
                        "value": '同学您好~~~，你的一卡通被别人捡到了，点击此条提醒信息，进去小程序领走你的一卡通吧~~~'
                    },

                },
                # "emphasis_keyword": "keyword1.DATA" # 将keyword1放大

            }
            temp = json.dumps(temp)
            reponse = requests.post(url=url, data=temp)
            print(access_token)
            print(reponse.json())

    def sen_us_msg(self,card_number,create_time,image):
        openid = 'oymyH5MGVjul6RgxHPqjCemriFn0'
        user_info=Member.objects.filter(openid=openid).first()
        if user_info:
            formid=user_info.formid
            access_token = self.getAccessToken()
            url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token={}'.format(access_token)
            template_id = 'uH3KUvDoNLaPw5TkBx222-V--t1s6jy96Ok7VLvkLcE'
            temp = {
                "touser": openid,  # 用户的openid
                "template_id": template_id,  # 模板id
                "page": "/pages/my/getcartinfo/index?image={0}&card_number={1}".format(image,card_number),
                "form_id": formid,  # 表单id
                "data": {
                    "keyword1": {
                        "value": '一卡通',
                        "color": "#173177"
                    },
                    "keyword2": {  # 物品描述
                        "value":'卡号：'+ str(card_number)
                    },
                    "keyword3": {  # 认领方式
                        "value": '一卡通中心'
                    },
                    "keyword4": {  # 发布时间
                        "value": str(create_time)
                    },
                    "keyword5": {  # 联系人
                        "value": '好心人'
                    },
                    "keyword6": {  # 类型
                        "value": '手机号'
                    },
                    "keyword7": {  # 联系方式
                        "value": '平台内可以看到'
                    },
                    "keyword8": {  # 處理進度
                        "value": '站内'
                    },
                },
                # "emphasis_keyword": "keyword1.DATA" # 将keyword1放大

            }
            temp = json.dumps(temp)
            reponse = requests.post(url=url, data=temp)
            print(access_token)
            print(reponse.json())


if __name__ == '__main__':
    # s=Service()
    # a=s.ckeck_kefu_token('token','20181227','dsfsfasfasfas')
    # print(a)
    print(datetime.now())