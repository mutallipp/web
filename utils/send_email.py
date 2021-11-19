# -*- coding: utf-8 -*-
#! /usr/bin/env python3
# 文件名 ：send_email
# 日期 ：2019/4/21 20:05
# author: Murallip


import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os


def send_email(att='色还是一个测试~~~~'):
    smtpserver = "smtp.126.com"  # 发送服务器
    port = 465  # 启用SSL发信, 端口一般是465
    sender = "udak_of_300@126.com"  # 寄件人账号
    psw = "225915Ay"  # 授权码密码（在邮箱设置里面设置）
    receiver = ['741116327@qq.com']  # 接受者
    subject = "主题：这是一个化测试报告"

    # 创建一个带附件的实例
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = ';'.join(receiver)  # 多人接受时写法
    msg['Subject'] = subject

    # 构造附件：
    # 先读附件
    test_report = os.path.join(os.path.dirname(os.path.realpath(__file__)), "result.html")
    # with open(test_report, "rb") as fp:
    #     mail_body = fp.read()
    # 邮件正文内容：
    # msg.attach(MIMEText("这是一个带附件的邮件", 'plain', 'utf-8')) #正文是以文字存在时
    # msg.attach(MIMEText(mail_body, 'html', 'utf-8'))  # 正文以html存在时
    # 以下是写附件的格式：
    # att = MIMEText('这是一个测试邮件~~~~~~')   #有点慢不知道什么原因
    att = MIMEText('这是一个测试邮件~~~~~~' 'plain','utf-8')
    # att["Content-Type"] = 'application/octet-stream'
    # att["Content-Disposition"] = 'attachment;filename="report_test.html"'  # filename是重名附件名字
    msg.attach(att)

    # 同事兼容163和QQ邮箱的登录方法
    try:
        smtp = smtplib.SMTP()
        smtp.connect(smtpserver)
        smtp.login(sender, psw)  # 登录
    except:
        print('except')
        smtp = smtplib.SMTP_SSL(smtpserver, port)
        smtp.login(sender, psw)
    # smtp.login(sender,psw)              #登录
    smtp.sendmail(sender, receiver, msg.as_string())  # 发送 as_string 作为字符串类型发送msg['to'].split(",")
    smtp.quit()
    print('send success')



def sendEmail():
    title='主题：这是一个标题'
    content='这是一个测试正文~~~~'
    # 第三方 SMTP 服务
    mail_host = "smtp.126.com"  # SMTP服务器
    mail_user = "udak_of_300@126.com"  # 用户名
    mail_pass = "225915Ay"  # 授权密码，非登录密码
    sender = 'udak_of_300@126.com' # 发件人邮箱(最好写全, 不然会失败)
    receivers = ['mutallip225@126.com','741116327@qq.com']  # 接收邮件，可设置为你的QQ邮箱或者其他邮箱

    message = MIMEText(content, 'plain', 'utf-8')  # 内容, 格式, 编码
    message['From'] = "{}".format(sender)
    message['To'] = ",".join(receivers)
    message['Subject'] = title
    try:
        smtpObj = smtplib.SMTP_SSL(mail_host, 465)  # 启用SSL发信, 端口一般是465
        smtpObj.login(mail_user, mail_pass)  # 登录验证
        smtpObj.sendmail(sender, receivers, message.as_string())  # 发送
        print("mail has been send successfully.")
    except smtplib.SMTPException as e:
        print(e)

if __name__ == "__main__":
    sendEmail()
    # send_email()