import json

import requests,re
import time
from lxml import etree


class Arzu(object):
	def __init__(self):
		self.base_url='http://i5ki9.cn/app'
		self.headers = {
			'User-Agent': 'Mozilla/5.0 (Linux U Android 2.3.6 zh-cn GT-S5660 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MicroMessenger/4.5.255',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,images/webp,images/apng,*/*;q=0.8',
			'Accept-Encoding': 'gzip, deflate'
		}

	def req(self,url):
		try:
			response = requests.get(url, headers=self.headers)
			r = response.content.decode()
			if r :
				return r
		except :
			print('请求失败')
			return ''

	def get_html(self):
			# for k in range(1, 5):
			# 	print(k)
			self.start_url = 'http://i5ki9.cn/app/index.php?i=6&c=entry&id=5&sid=0&do=list&m=iweite_vipvods&page={}'.format(1)
			ob = self.req(self.start_url)
			html = etree.HTML(ob)
			data=html.xpath('//div[@class="books-row"]/div[@class="item"]')
			'//*[@id="mainFrame"]'
			for i in data:
				image_url=i.xpath('a/img/@data-original')[0] if i.xpath('a/img/@data-original') else ''
				title=i.xpath('a/div[@class="title"]/text()')[0] if i.xpath('a/div[@class="title"]/text()') else ''
				video_id=self.base_url+i.xpath('a/@href')[0][1:]
				video_url=self.get_video(video_id)
				if video_url:
					yield {'title':title,
								'video_url':video_url,
								'image_url':image_url,
								'content':None,
								'suzuk':'',
											}

	def get_video(self,url):
		# base_url=self.base_url+'/index.php?i=6&c=entry&url={}&do=yunparse&m=iweite_vipvods'.format(url)
		a=self.req(url)
		# html = etree.HTML(a)
		b=re.findall(r'.*?i=6&c=entry&url=(.*?)&do=yunparse&m=iweite_vipvods"',a,re.S)[0] if re.findall(r'.*?i=6&c=entry&url=(.*?)&do=yunparse&m=iweite_vipvods"',a,re.S) else ''
		if b:
			ajx_url='http://i5ki9.cn/addons/iweite_vipvods/api/1016794804.php?vid={}'.format(b)
			c=self.req(ajx_url)
			video_url=re.findall(r'.*?"url":"(.*?)".*?',c)[0].split('?')[0]
			if  'm3u8' in video_url:
				return video_url
			else:
				return None
		# data=html.xpath('//*[@id="mainFrame"]')



	def run(self):
		print('Arzu')
		data=[x for x in self.get_html()]
		return data[:5]


class Izqut(object):
	"""docstring for Izqut"""
	def __init__(self,):
		self.youku_player='http://player.youku.com/embed/'
		self.base_url='https://izqut.wxnet.cc/kino/'
		self.headers={
            'User-Agent': 'Mozilla/5.0 (Linux U Android 2.3.6 zh-cn GT-S5660 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MicroMessenger/4.5.255',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,images/webp,images/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate'
        }



	def req(self,url):
		try:
			response = requests.get(url, headers=self.headers)
			r = response.content.decode()
			if r :
				return r
		except :
			print('请求失败')
			return ''


	def get_html(self,tid):
		self.start_url = 'https://izqut.wxnet.cc/kino/list.php?type=1&tid={}'.format(tid)
		ob=self.req(self.start_url)
		html=etree.HTML(ob)
		data=html.xpath('//div[@class="tur_box"]/a')
		for i in data:
			vid_url=self.base_url+i.xpath('@href')[0]
			title=i.xpath('div/div[@class="list_title"]/text()')[0]
			image_url=i.xpath('div/div[@class="img"]/img/@data-original')[0]
			video_url=self.get_vid(vid_url)
			if video_url :
				if not 'php' in video_url:
					yield {'title':title,
						'video_url':video_url,
						'image_url':image_url,
						'content':None,
						'suzuk':'',
									}




	def get_data(self):
		data_list=[]
		start_url = 'https://izqut.wxnet.cc/kino/index.php'
		ob=self.req(start_url)
		html = etree.HTML(ob)
		data = html.xpath('//div[@class="tur_box"]/div[@class="tur_list"]')
		for i in data:
			vid_url = 'https://izqut.wxnet.cc/kino/'+i.xpath('a/@href')[0]
			title = i.xpath('a/div[@class="list_title"]/text()')[0]
			image_url=i.xpath('a/div[@class="img"]/img/@data-original')[0]
			video_url = self.get_vid(vid_url)
			if vid_url!=None:
				if not 'php' in video_url:
					data_list.append({'title': title,
						   				   'video_url': video_url,
						   				   'image_url': image_url,
						   				   'content': '',
						   				   'suzuk': '',
						   				   })
		return data_list




	def get_vid(self,url):
		ob=self.req(url)
		html=etree.HTML(ob)
		'//*[@id="box"]/iframe'
		try:
			data=self.base_url+html.xpath('//*[@id="box"]/iframe/@src')[0]
			a=self.req(data)
			html=etree.HTML(a)
		except Exception as e:
			return ''
		try:
			url=html.xpath('//*[@id="video"]/@src')[0]
			'//*[@id="video"]'
			url = url.split('?')[0]
			return url
		except Exception as e:
			return ''

	def run(self):
		print('Izqut~~~~~~~~~~')
		# tid=[13,14,3,4,33,17,2,25]
		# data=[]
		# for i in tid:
		# 	print(i)
		# 	for k in self.get_html(i):
		# 		data.append(k)

		return self.get_data()
		# return data


class Night(Izqut):

	def __init__(self, ):
		super(Night,self).__init__()
		self.start_url = 'http://www.pxmjs.cn/mobile/index/lists/catid/1.html&pid=1'
		self.base_url = 'http://www.pxmjs.cn'

	def get_html(self):
		response=self.req(self.start_url)
		html=etree.HTML(response)
		data=html.xpath('//ul[@class="img-list dis"]/li')
		video_list=[]
		for i in data:
			vid=i.xpath('a/@href')[0]
			# print(vid)
			title=i.xpath('a/h2/text()')[0]
			image_url=i.xpath('a/span/img/@data-src')[0]
			if not 'http' in image_url:
				image_url=self.base_url+image_url
			video_url=self.get_video(vid)
			# time.sleep(3)
			if video_url:
				video_list.append({
					'video_url':video_url,
					'title':title,
					'image_url':image_url
				})
		return video_list

	def get_video(self,url):
		if '.m3u8' in url:
			return url
		response=self.req(url)
		html=etree.HTML(response)
		# print(url)
		try:
			m3u8=html.xpath('//div[@id="bofang_box"]/iframe/@src')[0].split('?url=')[1]
		except Exception as e:
			a=self.exception_m3u8(html)
			return a  if a else None

		if 'youku' in m3u8:
			id=re.findall(r'.*?/id_(.*?)==.*?',m3u8)
			if id:
				video_url=self.youku_player+id[0]
				# print(video_url)
				if video_url :
					return video_url
				else:
					return None
			else:
				return None
			# print(id)
		else:
			return m3u8 if  '.m3u8' in m3u8 else None

	def exception_m3u8(self,html):
		if not html :
			return None
		m3u8 = html.xpath('//div[@id="bofang_box"]/iframe/@src')[0].split('?url=')
		# print(m3u8)
		if m3u8:
			return m3u8[0] if  '.m3u8' in m3u8[0] else None
		else:
			return None

	def run(self):
		print('Night')
		return self.get_html()

if __name__ == '__main__':
	night=Night()
	night.get_html()

		# print(k)
	# print(len(b))
	# for i in b:
	# 	print(i['image_url'])



