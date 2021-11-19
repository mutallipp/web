# 文件名 ：vdspider
# 日期 ：2018/11/17 19:20
# author: Murallip
import datetime
import pymysql,datetime
from get_video_info import run
from download_index_html import Download_html
from crawler import Yingyuan,Xiaoyao,DY186

sql_insert='insert into user(userid,username) values(10,"name10")'
sql_update='update user set username="name91" where userid=9'
sql_delete='delete from user where userid=3'

def spider():
    print('\n',datetime.datetime.now())
    # try:
    #     xy=Xiaoyao().run()[:5]
    #     save_msql(xy)
    # except:
    #     print('小妖爬去失败')
    try:
        yx=Yingyuan().run()[:5]
        save_msql(yx)
    except:
        print('影院爬去失败')
    try:
        dy186=DY186().run()[:5]
        save_msql(dy186)
    except:
        print('DY186爬去失败')
    Download_html().http_down()



def db_updata(title,video_url,suzuk):
    conn = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='225915',
        db='video',
        charset="utf8"
    )
    cursor = conn.cursor()
    sql_update = 'update index_video set video_url="{1}",update_time="{2}",suzuk="{3}" where title="{0}"'.format(title,video_url,datetime.datetime.now(),suzuk)
    try:
        cursor.execute(sql_update)
        conn.commit()
        print('更新成功',title)
    except Exception:
        conn.rollback()
        print('存到MySQL失败了')

    conn.close()




def get_title():
    title_list=[]
    conn = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='225915',
        db='video',
        charset="utf8"
    )
    cursor = conn.cursor()
    sql = "SELECT * FROM index_video "
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for row in results:
            title = row[1]
            title_list.append(title)

    except:
        print("Error: unable to fecth data")

    # 关闭数据库连接
    conn.close()
    return title_list


def save_msql( data):
    conn = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='225915',
        db='video',
        charset="utf8"
    )
    title_list = get_title()
    for i in data:
        if i['video_url'] and i['image_url'] and i['title']:
            if not i['title'] in title_list:
                print('没有~~~~~~~~~',i['title'])
                info=run(i['title'])
                type = info['type'] if info else None
                director = info['director'] if info else None
                actors = info['actors'] if info else None
                area = info['area'] if info else None
                content = info['content'] if info else None
                suzuk = i['suzuk'] if info else None
                cursor = conn.cursor()
                cursor.execute("select * from index_video;")
                # values = cursor.fetchall()
                # sql = "insert into index_video(title, url_image, vedeo_url) values('%s', '%s', %s)" % (i['title'], i['images'],i['video_url'])
                sql = "insert into index_video(title, url_image, video_url,tag,create_time,type,director,actors,area,content,update_time,suzuk) values('{0}', '{1}', '{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}')".format(
                i['title'], i['image_url'], i['video_url'], 'han', datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),type,director,actors,area,content,datetime.datetime.now(),suzuk)
                # print(sql)
                try:
                    cursor.execute(sql)
                    conn.commit()
                    print('成功的存到数据了', i['title'])
                    title_list.append(i['title'])
                except Exception:
                    conn.rollback()
                    print('存到MySQL失败了', i['title'])
            else:
                if i['suzuk']:
                    cursor = conn.cursor()
                    sql_get = 'SELECT suzuk FROM index_video WHERE title="{}"'.format(i['title'])
                    cursor.execute(sql_get)
                    # 获取所有记录列表
                    results = cursor.fetchall()
                    for k in results:
                        if k[0]!=None :
                            max=get_suzuk(k[0],i['suzuk'])
                            if max!=k[0] and max!=None:
                                db_updata(i['title'],i['video_url'],i['suzuk'])
                        else:
                            db_updata(i['title'], i['video_url'], i['suzuk'])
                print('已存在',i['title'])
    conn.close()


def get_b(suzuk):
    if type(suzuk)=='str':
        suzuk=suzuk.upper
        ab={
            '抢先':'TS',
            'TS':'TS',
            'TC':'TS'
        }

        return ab[suzuk] if ab[suzuk] else None
    else:
        return None

def get_suzuk(a,b):
    ab={
        'TS':1,
        '清晰':2,
        '高清':3,
        '正片':4,
    }
    a=get_b(a) if get_b(a) else None
    b=get_b(b) if get_b(b) else None
    if a and b:
        c=ab[a]
        d=ab[b]
        e=max(c,d)
        f=[k for k, v in ab.items() if v == e]
        return f[0]
    else:
        return None


def test():
    sql_get = 'SELECT suzuk FROM index_video WHERE title="物怪"'
    conn = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='225915',
        db='video',
        charset="utf8"
    )
    cursor = conn.cursor()
    try:
        # 执行SQL语句
        cursor.execute(sql_get)
        # 获取所有记录列表
        results = cursor.fetchall()
        for i in results:
            print(i[0])
        print(results)

    except:
        print("Error: unable to fecth data")

    # 关闭数据库连接
    conn.close()

if __name__ == '__main__':
    spider()
    # a=get_title()
    # print(a)
    # get_suzuk('清晰','TS')
    # test()
    # print('我'.upper())