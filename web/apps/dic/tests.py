import os,django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "web.settings")# project_name 项目名称
django.setup()
import pymysql
import json,time,sys
from django.test import TestCase
from dic.models import Radio,RadioT
import django



from datetime import datetime
import urllib.parse
from urllib import request

r_type={
    2:'index',
    5:'powst',
    11:'putbol',
    15:'balilar',
    24:'roman',
    26:'tawsiya',
    27:'subat',
    30:'darshana',
    31:'dilbahan',
    32:'korkunuqluk',
    33:'uzawaz',
    34:'kalinna',
    35:'izgu',
    36:'dilnawa',
    37:'dilfin',
    38:'gugum',
}

class Radios(object):


    def getRadioList(self,id):
        pagae = 1
        print(id)

        values = {"c_user_id": 209747, "session_key": "a65d158284540e74814fe63c101b32ad", "device": "hradio", "id": 26,
                  "page": 1}
        values['id'] = id
        post_url='https://api.fm.subat.cn/v2.2/radio-category/radios '

        data=[]
        while True:
            print('page:',pagae)
            values['page']=pagae
            target = self.req_post(post_url,values)
            for k in target['data']['data']:
                # tapsili=self.get_radio(k['id'])
                # k['tapsili']=tapsili
                data.append(k)
                # yield k
            if target['data']['next_page_url'] is None:
                return {'data':data,'rType':r_type[id]}
                # break
            else:
                pagae += 1
                time.sleep(1)


    def req_post(self,post_url,values):
        headers = {
            'User-Agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36'
        }
        c = urllib.parse.urlencode(values).encode('utf-8')
        req = request.Request(post_url, c, headers=headers)
        res = request.urlopen(req)
        res = res.read().decode('utf-8')
        target = json.loads(res)
        return target

    def get_radio(self,id):
        url='https://api.fm.subat.cn/v2.2/radio/programs'
        param={"c_user_id":209747,"session_key":"a65d158284540e74814fe63c101b32ad","device":"hradio","id":1052 }
        param['id']=id
        target=self.req_post(url,param)
        for i in target['data']:
            a=i['name']
            mp3='http://m-cdn.node.m.subat.cn/64k/{}.mp3'.format(a)
            i['mp3']=mp3
        return target



    def getRadio(self):
        data=[]
        for i in r_type.items():
            radio_list=self.getRadioList(i[0])
            # for k in radio_list:
            #     c={'data': k, 'rType': i[1]}
            # data.append(radio_list)
            self.save_msql(radio_list)
            # self.save2mysql(radio_list)

    def get_title(self):
        title_list = []
        conn = pymysql.connect(
            host='localhost',
            port=3306,
            user='root',
            passwd='225915',
            db='video',
            charset="utf8"
        )
        cursor = conn.cursor()
        sql = "SELECT * FROM dic_radio "
        try:
            # 执行SQL语句
            cursor.execute(sql)
            # 获取所有记录列表
            results = cursor.fetchall()
            for row in results:
                radio_id = row[9]
                title_list.append(radio_id)
            return title_list

        except:
            print("Error: unable to fecth data")



    def save2mysql(self,data):
        title_list = self.get_title()
        for i in data['data']:
            if not i['name'] in title_list:
                print('没有~~~~~~~~~', i['name'])
                radio=Radio(name=i['name'],description=i['description'],rType=data['rType'],image=i['images'],last_program_title=i['last_program_title'],subscribe_count=str(i['subscribe_count']),update_time=datetime.now,create_time=datetime.now)
                # radio=Radio()
                # radio.name=i['name']
                # radio.description=i['description']
                # radio.rType=data['rType']
                # radio.images=i['images']
                # radio.last_program_title=i['last_program_title']
                # radio.subscribe_count=i['subscribe_count']
                # radio.update_time=datetime.now()
                # radio.create_time=datetime.now()
                # radio.save()

                for j in i['tapsili']:
                    radiot = RadioT()
                    radiot.radio_id=radio.id
                    radiot.title=j['title']
                    radiot.description=j['description']
                    radiot.mp3=j['mp3']
                    radiot.last_program_title=j['last_program_title']
                    radiot.views=str(j['views'])
                    radiot.update_time = datetime.now()
                    radiot.create_time = datetime.now()
                    radiot.save()

    def save_msql(self,data):
        conn = pymysql.connect(
            host='localhost',
            port=3306,
            user='root',
            passwd='225915',
            db='video',
            charset="utf8"
        )
        title_list = self.get_title()
        for i in data['data']:
            if not i['name'] in title_list:
                print('没有~~~~~~~~~', i['name'])
                cursor = conn.cursor()
                # cursor.execute("select * from dic_radio;")
                sql = "insert into dic_radio(name, description, rType,images,last_program_title,subscribe_count,update_time,create_time,radio_id) values('{0}', '{1}', '{2}','{3}','{4}','{5}','{6}','{7}','{8}')".format(
                    i['name'], i['description'], data['rType'], 'http://img.music.subat.cn/radio/'+i['images']+'!middle',
                    i.get('last_program_title',''), str(i['subscribe_count']),datetime.now(),datetime.now(),
                    i['id'])
                try:
                    cursor.execute(sql)
                    radio_id=conn.insert_id()
                    conn.commit()
                    print('成功····', i['name'])
                    # self.saveFmysql(i['tapsili'],i['id'])
                except Exception:
                    conn.rollback()
                    print('存到MySQL失败了', i['name'])
            else:
                print('已存在', i['name'])
        conn.close()


    def saveFmysql(self,data=None,radio_id=None):
        conn = pymysql.connect(
            host='localhost',
            port=3306,
            user='root',
            passwd='225915',
            db='video',
            charset="utf8"
            )
        id=self.get_title()
        for j in data['data']:
            if radio_id==id:
                print("已存在",j['title'])
            else:

        # for j in range(10):
                sql_into = "insert into dic_radiot(radio_id, title, description,mp3,last_program_title,views,update_time,create_time) values('{0}', '{1}', '{2}','{3}','{4}','{5}','{6}','{7}')".format(
                    radio_id,
                    j['title'],
                    j.get('description',''),
                    j['mp3'],
                    j.get('last_program_title', ''),
                    str(j.get('views','')), datetime.now(), datetime.now())
                # sql = "insert into dic_radiot(radio_id, title, description,mp3,last_program_title,views,update_time,create_time) values('{0}', '{1}', '{2}','{3}','{4}','{5}','{6}','{7}')".format(
                #     1, 'titile', 'maz', 'sanmu',
                #     'jingzadi', 'oqboldum', datetime.now(), datetime.now())
                cursor = conn.cursor()
                try:
                    cursor.execute(sql_into)
                    print('成功~~~~')
                    conn.commit()
                except Exception:
                    conn.rollback()
                    print('已存在', j['title'])
        conn.close()


    def run(self):
        radi_idlist=self.get_title()
        for i in radi_idlist:
            data=self.get_radio(i)
            self.saveFmysql(data=data,radio_id=i)


if __name__ == '__main__':
    # a=Radio().run()
    # r={"c_user_id":209747,"session_key":"a65d158284540e74814fe63c101b32ad","device":"hradio","id":10525}
    # b=Radio().req_post('https://api.fm.subat.cn/v2.2/radio/programs',r)
    # a=Radio().saveFmysql(b)
    # print(a)
    # pwd = os.path.dirname(os.path.realpath(__file__))
    # print(pwd)
    # radiot=RadioT.objects.all()
    # for i in radiot:
    #     print(i.mp3)
    from pypinyin import pinyin,TONE

    pinyinlist = pinyin("四是四十是十", style=TONE)
    text=''
    for i in pinyinlist:
        text+=" "+i[0]
    print(text)