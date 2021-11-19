# 文件名 ：get_video-info
# 日期 ：2018/11/16 21:39
# author: Murallip
import json
import requests
import time

headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
}


def get_video_id(name):
    # url = 'https://douban.uieee.com/v2/movie/search?q={}'.format(name)
    url = 'https://api.douban.com/v2/movie/search?q={}'.format(name)
    response = get_html(url)
    if response['subjects']:
        video_id = response['subjects'][0]['id']
        if video_id:
            return video_id
        else:
            return None
    else:
        return None

def get_html(url):
    try:
        response = json.loads(requests.get(url,headers=headers).text)
        if response:
            return response
    except Exception as e:
        print('获取网页失败')
        return None


def get_info(id):
    url = 'https://douban.uieee.com/v2/movie/subject/{}'.format(id)
    response = get_html(url)
    if not response:
        return None
    else:
        if not response['summary']:
            return None
        content=response['summary']
        director=response['directors'][0]['name'] if response['directors'] else ''
        actors=''
        for i in response['casts'] if response else None:
            actors+=i['name']+'/'
        actors=actors[:-1]
        type=response['genres'][0] if response else ''
        area=response['countries'][0] if response else ''
        return {
            'content':content,
            'director':director,
            'actors':actors,
            'type':type,
            'area':area,
        }
    # print(response)


def run(name):
    video_id=get_video_id(name)
    if video_id:
        content=get_info(video_id)
        print('豆瓣被调用了')
        time.sleep(2)
        return content
    else:
        print('豆瓣被调用失败-----------')
        return None

if __name__ == '__main__':
    a=run('妖狐苏妲己')
    print(a)