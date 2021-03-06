"""
Django settings for web project.

Generated by 'django-admin startproject' using Django 1.8.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.8/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.insert(0,os.path.join(BASE_DIR,'apps'))
# sys.path.insert(0,BASE_DIR)
# sys.path.insert(1,os.path.join(BASE_DIR,'web'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.8/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'bzw=h1egqf6z#89@0(lll!2gpwblzuc)m)90t*1gutku^3zq=3'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# AUTH_USER_MODEL='users.Usersinfo'
# AUTHENTICATION_BACKENDS=(
#     # 'users.views.CustomBackend',
#     'django.contrib.auth.backends.ModelBackend',
#     'django.contrib.auth.backends.ModelBackend',
#     'allauth.account.auth_backends.AuthenticationBackend',
# )


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_crontab',
    'rest_framework',
    'captcha',
    'hitcount',
    'index',
    'weixin',
    'users',
    'bupadiu',
    'dic',
    'uyvideo',

)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'web.urls'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'web.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'video',
        'USER': 'root',
        'PASSWORD': '225915',
        # 'HOST': 'mutallip.cn',
        'HOST': 'localhost',
    }
}


# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/upload/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'upload')
STATIC_ROOT = os.path.join(BASE_DIR, 'static','root')
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

CRONJOBS = [
    ('10 6 * * *', 'index.crond.spider','>>/usr/study/django/web/logs/index/video_spider.log'),
    # ('*/5 * * * *', 'index.crond.spider','>>/usr/study/django/web/logs/index/video_spider.log'),
]

ADMINS = (
    ('??????', 'mutallip225@126.com')#?????????????????????debug?????????????????????????????????,django?????????????????????????????????????????????
)

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = "smtp.126.com"
EMAIL_PORT = 25
EMAIL_HOST_USER = "udak_of_300@126.com"
EMAIL_HOST_PASSWORD = "225915Ay"
EMAIL_USE_TLS= True
EMAIL_FROM = EMAIL_HOST_USER
SERVER_EMAIL = DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

APPID='wx85b87f5faa0404da'
SECRET = '128be7ec09fa958e18b036b477c9b895'


MINA={
    'APPID':'wxd5eed243f56e18c7',
    'SECRET':'090476e72aa7a882099668ac3e4af4e3',
}