"""
Django settings for szar_site project.

Generated by 'django-admin startproject' using Django 1.9.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""
from szar_site.base_settings import *
import keen, raven

# Set settings for email, all within the gmail.txt
email = open('szar_site/__pycache__/gmail.txt')
for i, line in enumerate(email.readlines()):
    line = line.strip()
    if i == 0:
        EMAIL_HOST_PASSWORD = line
    elif i == 1:
        EMAIL_HOST_USER = line
    elif i == 2:
        EMAIL_HOST = line
    elif i == 3:
        EMAIL_PORT = line
email.close()

# For raven
with open('szar_site/__pycache__/sentry.txt') as f:
    DNS_KEY = f.read().strip()

# Set settings for keen, all within individual files
with open('szar_site/__pycache__/secret_key.txt') as f:
    SECRET_KEY = f.read().strip()
with open('szar_site/__pycache__/keen_project.txt') as g:
    keen.project_id = g.read().strip()
with open('szar_site/__pycache__/keen_read.txt') as h:
    KEEN_READ_KEY = h.read().strip()
with open('szar_site/__pycache__/keen_url.txt') as i:
    KEEN_API_URL = i.read().strip()
with open('szar_site/__pycache__/keen_write.txt') as j:
    keen.write_key = j.read().strip()

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = []


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    'raven.contrib.django.raven_compat',
    'rsvp'
]

SSL_DOMAIN = 'http://127.0.0.1:8800/'

# Sentry/Raven configs
RAVEN_CONFIG = {
    'dsn': DNS_KEY,
    # If you are using git, you can also automatically configure the
    # release based on the git info.
    'release': raven.fetch_git_sha(BASE_DIR),
}
