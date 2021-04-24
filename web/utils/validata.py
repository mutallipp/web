# -*- coding: utf-8 -*-
#! /usr/bin/env python3
# 文件名 ：validata
# 日期 ：2019/4/21 21:37
# author: Murallip
import base64
import rsa,time,requests,json
from lxml import etree
from PIL import Image
from io import BytesIO
import urllib,re



__all__ = ['rsa_encrypt']

class Yiban:
    def __init__(self):
        self.key='-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDaFDNCeyiz5uX7dBhqY5tCYbUrV83UzUtJwcEzw31Ge2ptd3mTaCwC3qwtgPmSwyYYsp22Y+BSeFgOU/SpjlYOotlLBhq1L2qo6ZjQah1yu9XKLmXETTgWUqWNbFCbV1KbIFyc59BT2wHuXy6nVkehiBzcmXUzgPp20V80hZSyMwIDAQAB-----END PUBLIC KEY-----=='
        self.login_url = 'https://www.yiban.cn/login/doLoginAjax'
        self.base_url='https://www.yiban.cn'
        self.header = {
                   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36', }

    def _str2key(self,s):
        # 对字符串解码
        b_str = base64.b64decode(s)

        if len(b_str) < 162:
            return False

        hex_str = ''

        # 按位转换成16进制
        for x in b_str:
            h = hex(x)[2:]
            h = h.rjust(2, '0')
            hex_str += h

        # 找到模数和指数的开头结束位置
        m_start = 29 * 2
        e_start = 159 * 2
        m_len = 128 * 2
        e_len = 3 * 2

        modulus = hex_str[m_start:m_start + m_len]
        exponent = hex_str[e_start:e_start + e_len]

        return modulus, exponent


    def rsa_encrypt(self,s,):
        '''
        rsa加密
        :param s:
        :param pubkey_str:公钥
        :return:
        '''
        key = self._str2key(self.key)
        modulus = int(key[0], 16)
        exponent = int(key[1], 16)
        pubkey = rsa.PublicKey(modulus, exponent)
        return base64.b64encode(rsa.encrypt(s.encode(), pubkey)).decode()


    def login(self,s):
        data = {
            'account': '2017210200',
            'password': self.rsa_encrypt(s),
            'captcha':'',
            'keysTime': str(time.time())[:-5]
        }
        requests.get('https://www.yiban.cn/login?go=http://f.yiban.cn/iapp65401',headers=self.header)
        resp = requests.post(self.login_url, data=data)
        print(resp.json())

    def check_login(self):
        url='https://yiban.bupt.edu.cn/check.php'
        data={
            'username':"2017210210",
            'password':'06273314',
            'usertype':'0',
            'l':'zhs'
        }
        resp=requests.post(url,data=data,headers=self.header)
        time.sleep(1)
        print(resp.json())
        pateen = r".*?value='(.*?)' />.*?"
        # print(re.findall(pateen,resp.json()['html'])[0])
        value = re.findall(pateen, resp.json()['html'])[0]
        data={
            'run':value
        }
        resp2=requests.post('https://o.yiban.cn/uiss/check?scid=1005_0',data=data)
        print(resp2.text)


    def get_captcha(self):
        url='https://www.yiban.cn/login?go=http://f.yiban.cn/iapp65401'
        resp=requests.get(url)
        html = etree.HTML(resp.text)
        # data=html.xpath("//div[@class='mt15 login-captcha']/input/img/")
        img_url=html.xpath('//*[@id="login-box"]/div[3]/img/@src')[0]
        img_url=self.base_url+img_url
        try:
            print(img_url)
            response = requests.get('https://www.yiban.cn/captcha/index',headers=self.header,stream=True)
            # r = requests.get('https://www.yiban.cn/captcha/index', stream=True)
            with open('img3.jpg', 'wb') as f:
                f.write(response.content)
                f.close()
            # print(response)
            # with open('img2.jpg', 'wb') as f:
            #     f.write(response.content)
            #     f.close()
            # with open('img.png', 'wb') as f:
            #     f.write(response.content)
            #     f.close()
            # response=requests.get(img_url, timeout=30)
            image = Image.open('img.png')
            image.show()
        except Exception as e:
            print(e)
            return None
        print(img_url)

if __name__ == '__main__':
    # url='https://www.yiban.cn/simple/needlogin'
    yiban=Yiban()
    # yiban.get_captcha()
    # yiban.login('225915Ay')
    yiban.check_login()