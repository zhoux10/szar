"""
Django settings for szar_site project.

Generated by 'django-admin startproject' using Django 1.9.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""
from szar_site.base_settings import *
import os, dj_database_url, raven

SECRET_KEY = os.environ['SECRET_KEY']
KEEN_API_URL = os.environ['KEEN_API_URL']
KEEN_PROJECT_ID = os.environ['KEEN_PROJECT_ID']
KEEN_READ_KEY = os.environ['KEEN_READ_KEY']
KEEN_WRITE_KEY = os.environ['KEEN_WRITE_KEY']
EMAIL_HOST_PASSWORD = os.environ['EMAIL_HOST_PASSWORD']
EMAIL_HOST_USER = os.environ['EMAIL_HOST_USER']
EMAIL_HOST = os.environ['EMAIL_HOST']
EMAIL_PORT = os.environ['EMAIL_PORT']
DNS_KEY = os.environ['DNS_KEY']

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = True

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'raven.contrib.django.raven_compat',
    'rsvp',
]

# Cache static resources for a year (https://robinwinslow.uk/2016/02/25/adding-cache-headers-to-django/)
WHITENOISE_MAX_AGE = 31557600

# FOR HEROKU
# Parse database configuration from $DATABASE_URL
DATABASES['default'] =  dj_database_url.config()

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allow all host headers
ALLOWED_HOSTS = ['*']

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
# SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
X_FRAME_OPTIONS = "DENY"
SESSION_EXPIRE_AT_BROWSER_CLOSE=True #http://stackoverflow.com/questions/8015685/how-to-enable-https-in-django-auth-generated-pages

# Make reverse use https
# http://stackoverflow.com/a/19637196/4607533
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTOCOL', 'https')
os.environ['HTTPS'] = "on"
SSL_DOMAIN = 'https://www.szar.us'

# Sentry/Raven configs
RAVEN_CONFIG = {
    'dsn': DNS_KEY,
    # If you are using git, you can also automatically configure the
    # release based on the git info.
    'release': raven.fetch_git_sha(BASE_DIR),
}
