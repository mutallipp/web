from urllib import parse,request
import json,re,requests
from lxml import etree
import urllib.parse
import json

class Xiaoyao(object):
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36'
        }

    def req(self,url):
        try:
            response = requests.get(url, headers=self.headers)
            if response.status_code==200:
                return response.text
        except:
            return None

    def _xiaoyao(self):
        url='http://xiaoyao.cp158888.com/wap/vlist.php?cid=0'
        response=self.req(url)
        html=etree.HTML(response)
        data=html.xpath("//div[@class='dianying_box bgfff clearfix content']/ul[@class='clearfix']/li")
        for i in data:
            video_url='http://xiaoyao.cp158888.com/wap/'+i.xpath("a/@href")[0].split('./')[1]
            image_url=i.xpath("a/img/@src")[0]
            title=i.xpath("a/span/text()")[0]
            ob=self.get_video(video_url)
            if ob:
                video_url=ob['video_url']
                content=ob['content']
                yield {'video_url':video_url,'content':content,'title':title,'image_url':image_url,'suzuk':None}

    def get_video(self,url):
        response=self.req(url)
        if response:
            html = etree.HTML(response)
            video_url=html.xpath('//section[@class="jishi_box_y9 p_r"]/div[@class="jishi_box2"]/ul/li')
            b=html.xpath('//p[@class="jianjie_y9_p part"]/text()')
            content=None
            if b:
                content=str(b[0])
            for i in video_url:
                a=i.xpath('a/@href')[0]
                if '.m3u8' in a :
                    video_url=a.split('?url=')[1]
                    if video_url:
                        return {'video_url':video_url,'content':content}
                    else:
                        return None
                else:
                    return None
            else:
                return None

    def run(self):
        print('小妖~~~~~~~~~~~~~~~~')
        p = self._xiaoyao()
        date=[k for k in p]
        # print(date)
        return date

class Yingyuan(object):
    def __init__(self):
        self.start_url='http://7.jishuncw.cn/list/1_1__time_0____.html'
        self.headers={
            'User-Agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36'
        }
        self.base_url='http://7.jishuncw.cn'
        self.post_url='http://gitcms.bceapp.com/post.php'

    def req(self,url):
        try:
            response = requests.get(url, headers=self.headers)
            if response.status_code==200:
                return response.text
        except:
            return None

    def _yingyuan(self):
        response=self.req(self.start_url)
        html = etree.HTML(response)
        data=html.xpath('//ul[@class="video-list video-film-list clearfix"]/li')
        for i in data:
            url_link=self.base_url+i.xpath('a/@href')[0]
            title=i.xpath('a/div/h2/text()')[0]
            suzuk=i.xpath('a/div/div[@class="video-duration"]/text()')[0] if i.xpath('a/div/div[@class="video-duration"]/text()') else ''
            image_url=i.xpath('a/div/@data-echo')[0]
            video_url=self.get_video(url_link,title)
            yield {'video_url': video_url, 'content': None, 'title': title, 'image_url': image_url,'suzuk':suzuk}

    def get_video(self,url,title):
        response=self.req(url)
        html = etree.HTML(response)
        url_link=self.base_url+html.xpath('//div[@class="media-btn"]/a/@href')[0]
        r=self.req(url_link)
        ob=etree.HTML(r)
        vid=ob.xpath('//section[@id="aplayer"]/script/text()')[0].split(',')[6]
        vid=ob.xpath('//section[@id="aplayer"]/script/text()')[0]
        try:
            video_id = re.findall(r".*?%24(8\d+-\d-\d-\d-\d-\d-\d)", vid)[0]
        except:
            # print(vid)
            return None
        a=title
        video_url=self.url_post(video_id)
        if video_url:
            return video_url


    def url_post(self,vid):

        values ={
            'vid':vid
        }
        data = urllib.parse.urlencode(values).encode('utf-8')
        req = request.Request(self.post_url, data, headers=self.headers)
        res = request.urlopen(req)
        res = res.read().decode('utf-8')
        target = json.loads(res)
        video_url=target['PlayModel']
        return video_url

    def run(self):
        print('影院~~~~~~~~')
        p = self._yingyuan()
        date=[k for k in p]
        # print(date)
        return date


class DY186(object):
    def __init__(self):
        'http://ekranimtv.bookb.cn/index.php'
        self.start_url = 'http://186.y3199.cn/index.php?c=lists&id=1'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Linux U Android 2.3.6 zh-cn GT-S5660 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MicroMessenger/4.5.255',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,images/webp,images/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate'
        }

    def req(self, url):
        try:
            response = requests.get(url, headers=self.headers)
            r = response.content.decode()
            if r:
                return r
        except:
            print('请求失败')
            return None

    def get_viurl(self, url):
        ob = self.req(url)
        html = etree.HTML(ob)
        data = html.xpath('//iframe/@src')
        for i in data:
            if 'm3u8' in i:
                b = i.split('url=')
                return b[1]
                # vedeo_url=re.findall(r'<iframe src=".*?url=(.*?)"',respons,re.S)

    def get_html(self):
        data_list = []
        response = self.req(self.start_url)
        html = etree.HTML(response)
        data = html.xpath('//div[@class="stui-pannel_bd"]/ul/li[@class="col-md-6 col-sm-4 col-xs-3"]')
        for i in data[1:]:
            title = i.xpath('div/div/h4/a/text()')[0] if i.xpath('div/div/h4/a/text()') else None
            video_url = 'http://186.y3199.cn' + i.xpath('div/div/h4/a/@href')[0]
            if 'show' in video_url:
                video_url = video_url.replace('show', 'play')
            image_url = i.xpath('div/a/@data-original')[0]
            suzuk = i.xpath('div/a/span/text()')[0]
            video_url = self.get_viurl(video_url)

            yield {'title': title,
                   'video_url': video_url,
                   'image_url': image_url,
                   'content': None,
                   'suzuk': suzuk,
                   }

    def run(self):
        print('DY186~~~~~~~~~~~')
        data = [x for x in self.get_html()]
        return data


if __name__ == '__main__':
    # a=Xiaoyao().run()
    a=Yingyuan().run()[:5]
    print(a)


