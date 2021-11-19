# 文件名 ：download_index_html
# 日期 ：2018/11/2 22:08
# author: Murallip
import os
import urllib.request


BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

class Download_html():
    def __init__(self):
        # self.base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.base = BASE_DIR

    def getHtml(self, url):
        html = urllib.request.urlopen(url).read()
        return html

    def saveHtml(self, file_content):
        #    注意windows文件命名的禁用符，比如 /
        with open(self.base + '/templates/186/home.html', "wb") as f:
            #   写文件用bytes而不是str，所以要转码
            f.write(file_content)

    def http_down(self):
        aurl = "http://mutallip.cn/index/download/"
        html = self.getHtml(aurl)

        # file_name = 'template'
        self.saveHtml(html)
        print('下载完成')

if __name__ == '__main__':
    http=Download_html()
    http.http_down()
